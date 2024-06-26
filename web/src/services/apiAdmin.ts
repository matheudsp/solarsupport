import axios, { AxiosError} from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';

import { signOutAdmin } from '../contexts/AdminContext';

export function setupAPIAdmin( context = undefined){
    let cookies = parseCookies(context);

    const api = axios.create({
        //PRODUCTION SERVER
        // baseURL: 'https://solarsupport.onrender.com/',
        
        //DEVELOPMENT SERVER
        baseURL: 'http://localhost:3333',

        headers: {
            "Content-Type":'application/json',
            Authorization: `Bearer ${cookies['@nextauth.tokenAdmin']}`
            
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => { 
        if(error.response.status === 401){
            //qualquer erro 401 (unauthorized) deslogamos o usuario
            if(typeof window !== undefined){
                //chama funcao para deslogar-lo
                signOutAdmin();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}