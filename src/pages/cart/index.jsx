import React, { Component, createRef } from 'react';
import Header from '../../components/Header'
import {connect} from 'react-redux'
import Axios from 'axios'
import { API_URL, priceFormatter } from '../../helpers/idrformat';
import Notfound from './../notfound'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import ButtonUi from './../../components/button'
import {Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem} from 'reactstrap'
import {AddcartAction} from './../../redux/Actions'
import {Link} from 'react-router-dom'

class Cart extends Component {
    state = {
        cart: [],
        isOpen: false,
        pilihan: 0,
        invoice: createRef(),
        cc: createRef(),
        isValid: false
    }
    componentDidMount(){
        Axios.get(`${API_URL}/carts`,{
            params:{
                userId:this.props.id,
                _expand:'product'
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({cart:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }


    renderTotalHarga=()=>{
        var total=this.state.cart.reduce((total,num)=>{
            return total+(num.product.harga*num.qty)
        },0)
        return total
    }

    renderCart=()=>{
        if(this.state.cart.length === 0) {
            return(
                <div style={{fontSize: '20px', paddingTop: '10%'}}>YOUR CART IS EMPTY! GO TO CART</div>
            ) 
        }
        return this.state.cart.map((val,index)=>{
                return(
                    <TableRow key={val.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.product.namatrip}</TableCell>
                        <TableCell>
                            <div style={{maxWidth:'200px'}}>
                                <img width='100%' height='100%' src={val.product.gambar} alt={val.product.namatrip}/>
                            </div>
                        </TableCell>
                        <TableCell>{val.qty}</TableCell>
                        <TableCell>{priceFormatter(val.product.harga)}</TableCell>
                        <TableCell>{priceFormatter(val.product.harga*val.qty)}</TableCell>
                    </TableRow>
                )
        })
    }

    // transaction itu ada id,status,userId,tanggalpembayaran,metode,paymentinvoice,
    // transactionDetails id,transactionId,productId,price,qty
    onBayarClick=()=>{
        const {pilihan} = this.state
        if(pilihan == '1'){
            this.onPayTransInvoice()
        }else if(pilihan == '2'){
            this.onPayCC()
        }else{
            alert('Select type of payment in advance')
        }
    }
    
    onPayCC=()=>{
        var ccNum = this.state.cc.current.value
        var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
        var amexpRegEx = /^(?:3[47][0-9]{13})$/;
        var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
      
        if (visaRegEx.test(ccNum)) {
          this.setState({isValid: true})
        } else if(mastercardRegEx.test(ccNum)) {
          this.setState({isValid: true})
        } else if(amexpRegEx.test(ccNum)) {
          this.setState({isValid: true})
        } else if(discovRegEx.test(ccNum)) {
          this.setState({isValid: true})
        }
      
        if(this.state.isValid) {
            Axios.post(`${API_URL}/transactions`,{
                status: 'Completed',
                userId: this.props.id,
                tanggalPembayaran: new Date().getTime(),
                metode: 'cc',
                paymentinvoice: this.state.cc.current.value
            }).then((res)=>{
                var arr=[]
                this.state.cart.forEach((val)=>{
                    arr.push(Axios.post(`${API_URL}/transactionsdetails`,{
                        transactionId:res.data.id,
                        productId:val.productId,
                        price: parseInt(val.product.harga),
                        qty:val.qty
                    }))
                })
                Axios.all(arr).then((res1)=>{
                    var deletearr=[]
                    this.state.cart.forEach((val)=>{
                        deletearr.push(Axios.delete(`${API_URL}/carts/${val.id}`))
                    })
                    Axios.all(deletearr)
                    .then(()=>{
                        Axios.get(`${API_URL}/carts`,{
                            params:{
                                userId:this.props.id,
                                _expand:'product'
                            }
                        })
                        .then((res3)=>{
                            console.log(res3.data)
                            this.props.AddcartAction([])
                            this.setState({cart:res3.data,isOpen:false})
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }).catch((Err)=>{
                        console.log(Err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
    
            })
        } else {
           alert("Please provide a valid Visa number!");
        }
    }

    onPayTransInvoice=()=>{
        Axios.post(`${API_URL}/transactions`,{
            status: 'WaitingAdmin',
            userId: this.props.id,
            tanggalPembayaran: new Date().getTime(),
            metode: 'upload',
            paymentinvoice: this.state.invoice.current.value
        }).then((res)=>{
            var arr=[]
            this.state.cart.forEach((val)=>{
                arr.push(Axios.post(`${API_URL}/transactionsdetails`,{
                    transactionId:res.data.id,
                    productId:val.productId,
                    price: parseInt(val.product.harga),
                    qty:val.qty
                }))
            })
            Axios.all(arr).then((res1)=>{
                var deletearr=[]
                this.state.cart.forEach((val)=>{
                    deletearr.push(Axios.delete(`${API_URL}/carts/${val.id}`))
                })
                Axios.all(deletearr)
                .then(()=>{
                    Axios.get(`${API_URL}/carts`,{
                        params:{
                            userId:this.props.id,
                            _expand:'product'
                        }
                    })
                    .then((res3)=>{
                        console.log(res3.data)
                        this.props.AddcartAction([])
                        this.setState({cart:res3.data,isOpen:false})
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((Err)=>{
                    console.log(Err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{

        })
    }
    onCheckOutClick=()=>{
        this.setState({isOpen:true})
    }

    render() {
        if(this.props.role==='user') {
            return (
                <div>
                    <Modal isOpen={this.state.isOpen} toggle={()=>this.setState({isOpen:false})}>
                        <ModalHeader toggle={()=>this.setState({isOpen:false})}>Payment</ModalHeader>
                        <ModalBody>
                            <select onChange={(e)=>this.setState({pilihan:e.target.value})} className='form-control' defaultValue={0} >
                                <option value="0" hidden>Select payment</option>
                                <option value="1">Input Transfer Invoice</option>
                                <option value="2">Credit Card</option>
                            </select>
                            {
                                this.state.pilihan==2?
                                <input className='form-control' ref={this.state.cc} placeholder='input credit card'/>
                                :
                                this.state.pilihan==1?
                                <input className='form-control' ref={this.state.invoice}  placeholder='input payment invoice'/>
                                :
                                null
                            }
                            <div className='mt-2'>
                              Total Price  {priceFormatter(this.renderTotalHarga())}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <ButtonUi onClick={this.onBayarClick}>
                                Pay
                            </ButtonUi>
                        </ModalFooter>
                    </Modal>

                    <Header/>
                    <Breadcrumb className='tranparant m-0 px-4 pt-3'>
                        <BreadcrumbItem ><Link className='link-class' to="/">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem ><Link className='link-class' to="/products">Products</Link></BreadcrumbItem>
                        <BreadcrumbItem active >Cart</BreadcrumbItem>
                    </Breadcrumb>
                    <div className=' pt-3' style={{paddingLeft:'10%',paddingRight:'10%'}}>
                        <Paper >
                            <TableContainer >
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell style={{width:'200px'}}>Name of Trip</TableCell>
                                            <TableCell style={{width:'200px'}}>Image</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Subtotal Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.renderCart()}
                                    </TableBody>
                                    <TableFooter>
                                        <TableCell colSpan={4}></TableCell>
                                        <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>Subtotal Price</TableCell>
                                        <TableCell style={{color:'black', fontSize:20}}>{priceFormatter(this.renderTotalHarga())}</TableCell>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            <ButtonUi onClick={this.onCheckOutClick}  className='my-3' >
                                CheckOut
                            </ButtonUi>
                        </Paper>
                    </div>
                </div>
            );
        }else{
            return(
                <Notfound/>
            )
        }
    }
}
const MapstatetoProps=({Auth})=>{
    return {
        ...Auth
    }
}
export default connect(MapstatetoProps,{AddcartAction})(Cart);