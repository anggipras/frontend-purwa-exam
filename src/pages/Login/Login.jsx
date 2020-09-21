import React, { Component,createRef } from 'react';
import './Login.css'
import { withStyles } from '@material-ui/core/styles';
// import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
// import {API_URL} from './../../helpers/idrformat'
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom'
import {LoginFunc,LoginThunk,Clearfunc,RegisThunk} from './../../redux/Actions'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Particles from 'react-particles-js';
import Login1 from '../../assets/login/login1.webp'
import Login2 from '../../assets/login/login2.webp'
import Login3 from '../../assets/login/login3.webp'

const particleOptions = {
    particles: {
        number: {
            value: 160,
            density: {
                enable: false
            }
        },
        size: {
            value: 7,
            random: true,
            anim: {
                speed: 4,
                size_min: 0.3
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            random: true,
            speed: 1,
            direction: "top",
            out_mode: "out"
        }
    }
  }

const Styles={
    root:{
        'input': {
            '&::placeholder': {
           
              color: 'blue'
            },
        },

        '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: 'black',
              color:'black'
            },
            '&:hover fieldset': {
              borderColor: 'black',
              color:'black'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              border:'3px solid ',
              color:'black'
            },
          },
    }
}

class Login extends Component {
    state = {
        username: createRef(),
        password: createRef()
    }

    onLoginClick = () => {
        const {username, password} = this.state
        var user = username.current.value
        var pass = password.current.value
        this.props.LoginThunk(user, pass)
    }

    render() { 
        const { classes } = this.props;

        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        }
        
        return (
            <>
            <div className='row m-0 p-0' style={{background:'linear-gradient(180deg, #00ced9 30%, #baffab 90%)', height:'100%'}}>
            <Particles className='particles' params={particleOptions}/>
                <div className='col-md-6 m-0 p-0'>
                    <Carousel 
                        autoPlay 
                        showArrows={false} 
                        infiniteLoop={true} 
                        showIndicators={false} 
                        showThumbs={false} 
                        showStatus={false}
                        className='loginpic'
                        >
                        <div >
                            <img width='100%' height='100%' src={Login1} alt={'foto'} className='borderimg' />
                        </div>
                        <div>
                            <img width='100%' height='100%' src={Login2} alt={'foto'} className='borderimg' />
                        </div>
                        <div>
                            <img width='100%' height='100%' src={Login3} alt={'foto'} className='borderimg' />
                        </div>
                    </Carousel>
                </div>
                <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                    <div className='login-kotak d-flex px-4'>
                        <h1 className='align-self-center'>Login</h1>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ 
                                    className:'text-dark login-placeholder'
                                }} 
                                InputLabelProps={{
                                    className:'text-dark'
                                }} 
                                className={classes.root} 
                                inputRef={this.state.username} 
                                label="Username" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ className:'text-dark'}} 
                                className={classes.root} 
                                inputRef={this.state.password} 
                                InputLabelProps={{
                                    className:'text-dark'
                                }}
                                type="password"  
                                label="Password" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3 mb-2'>
                            {
                                this.props.Auth.error?
                                <div style={{fontSize: '95%'}} className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>X</span></div>
                                :
                                null
                            }
                        </div>
                        <div className='d-flex justify-content-end mt-3'>
                            <button 
                            // disabled={this.props.Auth.isLoading} 
                            onClick={this.onLoginClick} 
                            className='px-3 py-2 rounded text-dark' 
                            style={{border:'black 1px solid',backgroundColor:'transparent'}}>
                                Login
                            </button>
                        </div>
                        <div className='d-flex justify-content-end mt-2 mb-3'>
                            <Link to='/register'>
                                <button className='px-3 py-2 rounded text-dark' style={{border:'black 1px solid',backgroundColor:'transparent'}}>
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default withStyles(Styles) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc,RegisThunk})(Login));