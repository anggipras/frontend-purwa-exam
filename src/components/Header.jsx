import React,{useState} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link,NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaUserAstronaut,FaCartArrowDown} from 'react-icons/fa'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Logo from './../assets/homescreen/ownerlogo.png'
import {LogoutFunc} from './../redux/Actions'
// import FlightTakeoff from '@material-ui/icons/FlightTakeoff'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Ubuntu',
    fontSize: 30,
    color: 'black'
  },
  warna:{
    background: 'linear-gradient(45deg, #6bedfe 30%, #a6ff53 90%)'
  }
}));

const StyledBadge = withStyles(() => ({
  badge: {
    right: -3,
    top: 5,
    color:'black',
    fontSize:11,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    
    padding: '0 0px',
  },
}))(Badge);

function ButtonAppBar({username,isLogin,role,cart, LogoutFunc, id}) {
  const classes = useStyles();
  const [anchorEl,setopen]=useState(null)

  const onLogoutClick = () => {
    localStorage.removeItem('id')
    LogoutFunc()
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.warna} position='static'>
        <Toolbar>
            <NavLink to='/' >
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img src={Logo} height='50px' width='50px' alt='logo'/>
                </IconButton>
            </NavLink> 
          <Typography variant="h6" className={classes.title}>
            <div style={{borderRadius: '15px', border:'2px solid black', width: '15%'}}>
              <b className='d-flex justify-content-center' style={{fontSize: '80%'}}>MCAD Trip</b>
            </div>
          </Typography>
          {
            role==='user'?
            <Link to='/cart' style={{textDecoration:'none',color:'black'}}>
              <Button color="inherit">
                <StyledBadge badgeContent={cart.length} color='secondary' >
                  <span style={{fontSize:20}}>
                    <FaCartArrowDown />
                  </span>
                </StyledBadge>
              </Button>
            </Link>
            :
            null
          }
          {
            isLogin?
            <>
              {
                role === 'admin'?
                <>
                <Button color="black" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={()=>setopen(null)}
                >
                  <Link to='/manageAdmin' style={{textDecoration:'none',color:'black'}}>
                    <MenuItem >Edit Data</MenuItem>
                  </Link>
                  <Link to='/confirmation' style={{textDecoration:'none',color:'black'}}>
                    <MenuItem >Confirmation</MenuItem>
                  </Link>
                  <Link to='/' style={{textDecoration:'none',color:'black'}}>
                    <MenuItem onClick={onLogoutClick}>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
                </>
                :
                <>
                <Button color="black" onClick={(e)=>setopen(e.currentTarget)}><FaUserAstronaut/>&nbsp;{username}</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={()=>setopen(null)}
                >
                  <Link to={'/history/'+ id } style={{textDecoration:'none',color:'black'}}>
                    <MenuItem >History</MenuItem>
                  </Link>
                  <Link to='/' style={{textDecoration:'none',color:'black'}}>
                    <MenuItem onClick={onLogoutClick}>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
                </>
              }
            </>
            :
            <Link to='/login' style={{textDecoration:'none',color:'black'}}>
              <Button color="inherit">Login</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth
  }
}
export default connect(MapstatetoProps,{LogoutFunc})(ButtonAppBar);