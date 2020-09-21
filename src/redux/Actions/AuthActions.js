import Axios from 'axios'
import { API_URL } from '../../helpers/idrformat'
import {ADDCART} from './../Type'

export const LoginFunc = (user, cart) => {
    return{
        type: 'LOGIN',
        payload: user,
        cart: cart
    }
}

export const Clearfunc = () => {
    return{
        type: 'CLEAR'
    }
}


export const AddcartAction = (cart) => {
    return{
        type: ADDCART,
        cart: cart
    }
}

export const LogoutFunc = () => {
    return {
        type: 'LOGOUT'
    }
}

export const LoginThunk = (username, password) => {
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.get(`${API_URL}/users`,{
            params:{
                username: username,
                password: password
            }
        }).then((res)=>{
            if(res.data.length){
                Axios.get(`${API_URL}/carts`,{
                    params:{
                        userId:res.data[0].id,
                        _expand:'product'
                    }
                }).then((res1)=>{
                    localStorage.setItem('id', res.data[0].id)
                    dispatch({type:'LOGIN', payload:res.data[0], cart: res1.data})
                }).catch((err)=>{
                    dispatch({type:'Error', payload:'the server is error'})
                })
            } else {
                dispatch({type:'Error', payload: 'Password/Username is wrong'})
            }
        }).catch((err)=>{
            dispatch({type:'Error', payload: 'the server is error'})
        })
    }
}

export const RegisThunk = (username, password, email) => {
    return (dispatch) => {
        dispatch({type:'LOADING'})
        Axios.get(`${API_URL}/users`,{
            params:{
                username: username
            }
        }).then((res)=> {
            if(res.data.length) {
                dispatch({type:'Error', payload: 'Username is already taken'})
            } else {
                if(password === '' || email === '') {
                    dispatch({type:'Error', payload: 'Please fill out all the forms'})
                } else {
                    Axios.post(`${API_URL}/users`,{
                        username: username,
                        password: password,
                        email: email,
                        role: 'user'
                    }).then(()=> {
                        dispatch({type:'REGISTER'})
                    }).catch((err)=> {
                        dispatch({type:'Error', payload:'the server is error'})
                    })
                }
            }
        }).catch((Err)=> {
            dispatch({type:'Error', payload:'the server is error'})
        })
    }
}