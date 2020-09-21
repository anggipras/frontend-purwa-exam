import {ADDCART} from './../Type'

const INITIAL_STATE={
    username:'',
    password:'',
    id:0,
    isLogin:false,
    isRegis: false,
    error:'',
    isLoading:false,
    cart:[]
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':        
            return {...state,...action.payload, isLogin: true, isLoading: false, cart: action.cart}
        case 'REGISTER':        
            return {...state, isRegis: true}
        case 'LOGOUT':
            return INITIAL_STATE
        case 'Error':
            return{ ...state, error: action.payload, isLoading: false} 
        case 'LOADING':
            return{...state, isLoading: true} 
        case 'CLEAR':
            return{...state, error: ''} 
        case ADDCART:
            return{...state, cart: action.cart}
        default:
            return state
    }
}