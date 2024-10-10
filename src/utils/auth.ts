import Cookies from 'js-cookie';
import {UserSession} from '../types/User'

export const setUserSession = (userSession: UserSession)=>{
    Cookies.set('userSession', JSON.stringify(userSession));

}

export const getUserSession = ()=>{
    return Cookies.get('userSession');
}

export const removeUserSession = ()=>{
    
}