import React, { useEffect,useState } from 'react';
import './App.css';
import {Loading} from './components'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {API_URL} from './helpers/idrformat'
import {LoginFunc} from './redux/Actions'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import Axios from 'axios'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/home/home'
import ManageAdmin from './pages/admin/admin'
import ConfirmAdmin from './pages/admin/confirm'
import ListProd from './pages/Listprod'
import DetailProd from './pages/detailprod'
import Cart from './pages/cart'
import History from './pages/History/history'
import NotFound from './pages/notfound'

// umum : register, logout
// user : patch qty on Cart, search bar, history page, can't buy outdated items
// admin : confirm admin for transfer invoice, cc validation with luhn algorithm
// etc : deploy

toast.configure()

function App(props) {
  const [loading,setloading]=useState(true)

  useEffect(()=>{
    var id=localStorage.getItem('id')
    if(id){ 
      Axios.get(`${API_URL}/users/${id}`)
      .then((res)=>{
        Axios.get(`${API_URL}/carts`,{
          params:{
              userId:res.data.id,
              _expand:'product'
          }
        }).then((res1)=>{
            props.LoginFunc(res.data,res1.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
          setloading(false)
        })
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      setloading(false)
    }
  },[])

  if(loading){
    return(
      <Loading/>
    )
  }

  const renderProtectedRoutes = () => {
    if(props.role==='admin'){
      return(
        <>
          <Route exact path='/manageAdmin' component={ManageAdmin}/>
          <Route exact path='/confirmation' component={ConfirmAdmin}/>
        </>
      )
    } 
  }

  return (
    <div >
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/products' component={ListProd}/>
        <Route path='/products/:id' component={DetailProd}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/history/:id' component={History}/>
        {renderProtectedRoutes()}
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

const MapstatetoProps=({Auth})=>{
  return{
    ...Auth
  }
}

export default connect(MapstatetoProps,{LoginFunc}) (App);
