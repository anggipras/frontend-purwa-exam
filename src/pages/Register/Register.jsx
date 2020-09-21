import React, { Component,createRef } from 'react';
import './Register.css'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {LoginFunc,LoginThunk,Clearfunc,RegisThunk} from '../../redux/Actions'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Particles from 'react-particles-js';
import Login1 from '../../assets/login/login1.webp'
import Login2 from '../../assets/login/login2.webp'
import Login3 from '../../assets/login/login3.webp'
import Swal from 'sweetalert2'

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

class Register extends Component {
    state = {
        userchange: '',
        passchange: '',
        emailchange: '',
        registerform: false,
        errorInfo: '',
        confirmInfo: '',
        seePassword: false,
        username: createRef(),
        password: createRef(),
        email: createRef(),
    }

    onUsernameChange = (e) => {
        if(e.target.value) {
            this.setState({userchange: e.target.value, errorInfo: ''})
        } else if(e.target.value === '') {
            this.setState({errorInfo: 'Username is required'})
        } 
    }

    onEmailChange = (e) => {
        var emailtester = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.target.value)
        if(emailtester) {
            this.setState({emailchange: e.target.value, errorInfo: ''})
        } else if(e.target.value === '') {
            this.setState({errorInfo: ''})
        } else {
            this.setState({errorInfo: 'Email is not in a valid pattern'})
        }
    }

    onPasswordChange = (e) => {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/
        var tester = reg.test(e.target.value)

        if(tester) {
            this.setState({passchange: e.target.value, errorInfo: ''})
        } else if(e.target.value === '') {
            this.setState({errorInfo: ''})
        } else {
            this.setState({errorInfo: 'Must Contain 6 Characters, One Uppercase, One Lowercase, and One Number'})
        }
    }

    onPasswordValid = (e) => {
        if(e.target.value === this.state.passchange) {
            this.setState({passchange: e.target.value, confirmInfo: 'Password is match'})
            this.setState({errorInfo: ''})
        } else {
            this.setState({errorInfo: 'Password is not match!', confirmInfo: ''})
        }
    }

    onRegisterClick = () => {
        // const {username, password, email} = this.state
        // var user = username.current.value
        // var pass = password.current.value
        // var ema = email.current.value

        var user = this.state.userchange
        var pass = this.state.passchange
        var ema = this.state.emailchange

        this.props.RegisThunk(user, pass, ema)

    }

    registeredPopUp = () => {
        Swal.fire({
            title: 'You are registered',
            text: "Now you can login!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Login!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.setState({registerform: true})
            }
          })
    }

    render() { 
        const { classes } = this.props;
        
        if(this.state.registerform){
            return <Redirect to='/login' />
        }
            
        return (
            <>
            <div className='row m-0 p-0' style={{background:'linear-gradient(0deg, #00ced9 30%, #baffab 90%)', height:'100%'}}>
            <Particles className='particles' params={particleOptions}/>
                {
                    this.props.Auth.isRegis?
                    this.registeredPopUp()
                    :
                    null
                }
                <div className='col-md-6 m-0 p-0 d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                    <div className='regis-kotak d-flex px-4'>
                        <h1 className='align-self-center'>Register</h1>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ 
                                    className:'text-dark regis-placeholder'
                                }} 
                                InputLabelProps={{
                                    className:'text-dark'
                                }} 
                                className={classes.root} 
                                // inputRef={this.state.username}
                                onChange={this.onUsernameChange} 
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
                                // inputRef={this.state.email} 
                                onChange={this.onEmailChange}
                                InputLabelProps={{
                                    className:'text-dark'
                                }}
                                type="text"  
                                label="Email" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-4 mb-3' style={{border: '1px solid black', width: '100%', backgroundColor: 'black'}}></div>
                        <div className='mt-1'>
                            <TextField 
                                inputProps={{ className:'text-dark'}} 
                                className={classes.root} 
                                // inputRef={this.state.password}
                                onChange={this.onPasswordChange}
                                InputLabelProps={{
                                    className:'text-dark'
                                }}
                                type={this.state.seePassword?"text":"password"} 
                                label="Password" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-3'>
                            <TextField 
                                inputProps={{ className:'text-dark'}} 
                                className={classes.root} 
                                onChange={this.onPasswordValid}
                                InputLabelProps={{
                                    className:'text-dark'
                                }}
                                type={this.state.seePassword?"text":"password"}  
                                label="Confirm Password" 
                                fullWidth='true' 
                                variant="outlined" 
                                size='small' 
                            />
                        </div>
                        <div className='mt-2'>
                            {/* <input type='checkbox' onClick={(e)=>this.setState({seePassword: e.target.checked})}  /> */}
                                {
                                    this.state.seePassword?
                                    <button onClick={()=> this.setState({seePassword: false})} style={{border: 'none', backgroundColor: 'transparent', outline: 'none'}}>
                                        <i class="far fa-eye"></i>
                                    </button>
                                    :
                                    <button onClick={()=> this.setState({seePassword: true})} style={{border: 'none', backgroundColor: 'transparent', outline: 'none'}}>
                                        <i class="far fa-eye-slash"></i>
                                    </button>
                                }
                        </div>
                        <div className='mt-3 mb-2'>
                            {
                                this.props.Auth.error?
                                <div className='alert alert-danger'>{this.props.Auth.error} <span onClick={this.props.Clearfunc} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>X</span></div>
                                :
                                null
                            }
                            {
                                this.state.errorInfo?
                                <div className='alert alert-danger'>{this.state.errorInfo} <span onClick={()=>this.setState({errorInfo: ''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>X</span></div>
                                :
                                null
                            }
                            {
                                this.state.confirmInfo?
                                <div className='alert alert-success'>{this.state.confirmInfo} <span onClick={()=>this.setState({confirmInfo: ''})} style={{fontWeight:'bolder',cursor:'pointer',float:'right'}}>X</span></div>
                                :
                                null
                            }
                        </div>
                        <div className='d-flex justify-content-between mt-2 mb-3'>
                            <button onClick={this.onRegisterClick} className='px-3 py-2 rounded text-dark' style={{border:'black 1px solid',backgroundColor:'transparent'}}>
                                Register
                            </button>
                            <div style={{fontSize: '80%'}}>
                                Have account? <Link to='/login'>Click here</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 m-0 p-0'>
                    <Carousel 
                        autoPlay 
                        showArrows={false} 
                        infiniteLoop={true} 
                        showIndicators={false} 
                        showThumbs={false} 
                        showStatus={false}
                        className='regispic'
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

export default withStyles(Styles) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc,RegisThunk})(Register));