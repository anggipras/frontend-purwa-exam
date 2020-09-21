import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import { Breadcrumb, BreadcrumbItem,Modal,ModalBody,ModalFooter} from 'reactstrap';
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios'
import ButtonUi from './../../components/button'
import { API_URL,dateformat } from '../../helpers/idrformat';
import {connect} from 'react-redux'
import {AddcartAction} from './../../redux/Actions'
import {toast} from 'react-toastify'
import Loading from './../../components/Loading'
import './detailprod.css'
import Swal from 'sweetalert2'

class DetailProd extends Component {
    state = {
        loading: true,
        products: {},
        qty: createRef(),
        isOpen: false,
        kelogin: false,
        sameQty: '',
        cartId: ''
    }

    componentDidMount(){
        Axios.get(`${API_URL}/products/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({products:res.data, loading:false})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onAddToCart=()=>{
        if(this.props.role === 'admin') {
            alert('jangan beli bro inget admin')
        }else if(this.props.role === 'user') {
            var nowDate = new Date().getTime()
            if(this.state.qty.current.value){
                if(nowDate >= this.state.products.tanggalmulai) {
                    Swal.fire({
                        icon: 'error',
                        title: `Oops... Can't buy ${this.state.products.namatrip} ticket`,
                        text: 'The trip is already start!',
                      })
                } else {
                    Axios.get(`${API_URL}/carts`,{
                        params: {
                            productId: this.state.products.id
                        }
                    }).then((res)=> {
                        if(res.data.length) {
                            this.setState({sameQty: res.data[0].qty, cartId: res.data[0].id})
                            Axios.patch(`${API_URL}/carts/${this.state.cartId}`,{
                                qty: this.state.sameQty + parseInt(this.state.qty.current.value)
                            }).then(()=> {
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: 'It has been added to cart',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            })
                        } else {
                            Axios.post(`${API_URL}/carts`,{
                                userId: this.props.id,
                                productId: this.state.products.id,
                                qty: parseInt(this.state.qty.current.value)
                            }).then(()=>{
                                Axios.get(`${API_URL}/carts`,{
                                    params: {
                                        userId: this.props.id,
                                        _expand:' product'
                                    }
                                }).then((res2)=>{
                                    this.props.AddcartAction(res2.data)
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: 'It has been added to cart',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }).catch((err)=> {
                                console.log(err)
                            })
                        }
                    }).catch((err)=> {
                        console.log(err)
                    })
                }
            } else {
                toast('you need to fill out the quantity', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else{
            this.setState({isOpen:true})
        }
    }
     
    onRedirecttoLogin=()=>{
        this.setState({isOpen:false,kelogin:true})
    }
    render() {
        const {products,isOpen}=this.state
        if(this.state.loading){
            return(
                <Loading />
            )
        }
        if(this.state.kelogin){
            return <Redirect to='/login'/>
        } 
        return (
            <div style={{color: 'black'}} className='m-0 p-0'>
                <Modal isOpen={isOpen} toggle={()=>this.setState({isOpen:false})}>
                    <ModalBody>
                        You need to register or login in advance
                    </ModalBody>
                    <ModalFooter>
                        <ButtonUi onClick={this.onRedirecttoLogin}>
                            login
                        </ButtonUi>
                    </ModalFooter>
                </Modal>

                <Header/>
                <Breadcrumb className='tranparant m-0 px-2'>
                    <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                    <BreadcrumbItem active >{this.state.products.namatrip}</BreadcrumbItem>
                </Breadcrumb>

                <div className="row m-0 px-3">
                    <div className="col-md-6">
                        <div style={{width:'100%', height:400}}>
                            <img src={products.gambar} style={{objectFit:'cover', objectPosition:'center', borderRadius: '20px 100px 20px 100px'}} height='100%' width='100%' alt={"foo"}/>
                        </div>
                    </div>
                    <div className="col-md-6 pt-2 pl-4 pr-4" style={{border: '1px solid black', borderRadius: '20px'}}>
                        <h1 className='mt-2'>{products.namatrip}</h1>
                        <div style={{border: '3px solid black'}}></div>
                        <div className=' mt-3'>{products.deskripsi}</div>
                        <h5 className='mt-2'>Start Date : {dateformat(products.tanggalmulai)}</h5>
                        <h5 className='mt-2'>End Date : {dateformat(products.tanggalberakhir)}</h5>
                        <label style={{marginTop: '10px'}}>Ticket Quantity</label><br/>
                        <input type="number" className={'form-control'} placeholder='quantity' style={{width:200}} ref={this.state.qty}/>
                        <div className='mt-5 d-flex justify-content-end'>
                            <ButtonUi onClick={this.onAddToCart}>
                                Add to cart
                            </ButtonUi>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction}) (DetailProd);