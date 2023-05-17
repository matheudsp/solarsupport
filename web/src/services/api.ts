import axios, { AxiosError} from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/UserContext';




export function setupAPIClient( context = undefined){
    let cookies = parseCookies(context);
    
    

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        // baseURL: 'http://10.9.136.185:3333',
        headers: {
            "Content-Type":'application/json',
            Authorization:`Bearer ${cookies['@nextauth.token']}`
            
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => { 
        if(error.response.status === 401){
            //qualquer erro 401 (unauthorized) deslogamos o usuario
            if(typeof window !== undefined){
                //chama funcao para deslogar-lo
                signOut();
                
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}