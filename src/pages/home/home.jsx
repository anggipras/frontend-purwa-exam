import React, { Component } from 'react';
import Homescreen from '../../assets/homescreen/Homescreen.webp'
import Clicknow from '../../assets/homescreen/clicknow.webp'
import Header from '../../components/Header'
import ButtonUi from '../../components/button'
import { Link } from "react-router-dom";
import './home.css'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios'
import { API_URL } from '../../helpers/idrformat';

class Home extends Component {
    state = {
        modalpass: false,
        data: {},
        newPass: '',
        errorInfo: '',
        matchInfo: ''
    }

    componentDidMount() {
        Axios.get(`${API_URL}/users/${this.props.Auth.id}`)
        .then((res)=> {
            this.setState({data: res.data})
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
    }

    oldPass = (e) => {
        if(e.target.value !== this.state.data.password) {
            this.setState({errorInfo: 'Forgot your old password?'})
        } else if(e.target.value === '') {
            this.setState({errorInfo: ''})
        } else {
            this.setState({errorInfo: ''})
        }
    }

    newPass = (e) => {
        if(e.target.value == this.state.data.password) {
            this.setState({errorInfo: 'You need to type different password'})
        } else {
            this.setState({newPass: e.target.value, errorInfo: ''})
        }
    }

    confirmPass = (e) => {
        if(this.state.newPass !== e.target.value) {
            this.setState({errorInfo: 'Password is not match'})
        } else {
            this.setState({matchInfo: 'Password is match!', errorInfo: ''})
        }
    }

    patchPassword = () => {
        Axios.patch(`${API_URL}/users/${this.props.Auth.id}`,{
            password: this.state.newPass
        }).then((res)=> {
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
    }

    togglepass = () => {
        this.setState({modalpass: true})
    }

    render() { 
        return (
            <>  
                <Modal isOpen={this.state.modalpass} toggle={()=>this.setState({modalpass: false})} >
                    <ModalHeader toggle={()=>this.setState({modalpass: false})}>Change Password</ModalHeader>
                    <ModalBody>
                        <input type="password" placeholder='Old Password' onChange={this.oldPass} />
                        <input type="password" placeholder='New Password' onChange={this.newPass}/>
                        <input type="password" placeholder='New Confirmation Password' onChange={this.confirmPass} />
                        {
                            this.state.errorInfo?
                            <div className='alert alert-danger'>{this.state.errorInfo}</div>
                            :
                            null
                        }
                        {
                            this.state.matchInfo?
                            <div className='alert alert-success'>{this.state.matchInfo}</div>
                            :
                            null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.patchPassword}>Save Password</Button>
                        <Button color="secondary" onClick={()=>this.setState({modalpass: false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Header/>
                <div className='text-dark d-flex justify-content-between align-items-center px-5' style={{height:'6vh',backgroundColor:'#ecf2f9', fontSize:'13px'}}>
                    <div>
                        MCAD TRIP STANDS WITH <b>BLACK LIVES MATTER</b>  
                    </div>
                    <Button color="black" onClick={()=> this.setState({modalpass: true})}>Change Password</Button> 
                </div>
                <div style={{width:'100%', height:'50vh'}}>
                    <img src={Homescreen} style={{objectFit:'cover'}} width='100%' height='100%' alt='img'/>
                    {
                        this.props.Auth.isLogin?
                        <div className='wordsLogin'>
                           <span style={{fontSize: '70%', paddingLeft: '10%'}}>Welcome <span style={{color: '#6becfe'}}>{this.props.Auth.username}!</span></span> <br/> Awaited Trip is Start Now
                        </div> 
                        :
                        <div className='words'>
                            Awaited Trip is Start Now
                        </div> 
                    }
                </div>
                <div className='px-5 mt-5'>
                    <div className="city">
                        <div className="mtp">
                            MCAD Trip's Preview
                        </div>
                        <div>
                            Let's get chance to go over region and country
                        </div>
                        <div className="row ml-0 mr-0 mt-3">
                            <div className="col-4 pl-0 overflow-hidden">
                                <img src="https://anekatempatwisata.com/wp-content/uploads/2018/03/Masjid-Raya-Medan.jpg" className="card-img-top cityimeji" alt="medan" />
                                <div className="info bg-white pl-3 pt-1">
                                    <div className="cityname">
                                        MEDAN
                                    </div>
                                    <div className="explanation">
                                        Spend couple days in this city and having great spicy foods
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 overflow-hidden pl-2 pr-2">
                                <img src="https://asset.kompas.com/crops/43BL_Jv4whTBdcNNbDwb7HFF_Fo=/0x0:1000x667/750x500/data/photo/2020/03/10/5e677a1b83e8d.jpg" className="card-img-top cityimeji" alt="yogyakarta" />
                                <div className="info bg-white pl-3 pt-1">
                                <div className="cityname">
                                    YOGYAKARTA
                                </div>
                                <div className="explanation">
                                    Most memorable city, small but full of peace
                                </div>
                                </div>
                            </div>
                            <div className="col-4 pr-0 overflow-hidden">
                                <img src="https://cdn.medcom.id/dynamic/content/2019/11/11/1082147/fpMvtLx9FR.jpg?w=480" className="card-img-top cityimeji" alt="jayapura" />
                                <div className="info bg-white pl-3 pt-1">
                                    <div className="cityname">
                                        JAYAPURA
                                    </div>
                                    <div className="explanation">
                                        Huge island which offer many cool places
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row p-0 m-0 mt-4 mx-5 mb-5' style={{border: '5px solid black',borderRadius: '25px'}}>
                    <div className="col-md-6 p-5 m-0 ">
                        <h1 style={{color: 'black', fontSize: '60px', fontFamily: 'Ubuntu'}}>{'SEE & GO NOW'}</h1>
                        <h4 className='mt-3'>Get full of promo and chance on specific dates. They are waiting for you!</h4>
                        <div className='mt-5'>
                            <Link to='/products'>
                                <ButtonUi>
                                    Book Now
                                </ButtonUi>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 m-0">
                        <img src={Clicknow} alt="journey" width='100%' style={{borderRadius: '100px 20px 100px 20px'}} />                        
                    </div>
                </div>
                <div className='text-white d-flex justify-content-center align-items-center' style={{height:'20vh',backgroundColor:'#fe6b8b'}}>
                    <h1>Mau Gabung?</h1>
                </div>
            </>
        );
    }
}
 
const MapstatetoProps=(state)=>{
    return {
      Auth: state.Auth
    }
  }
  export default connect(MapstatetoProps)(Home);