import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/apiClient';
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { toast } from 'react-toastify'


type AuthUserContextData = {
    user: UserProps;
    isAuth: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void;
    
}

type UserProps = {
    id: string;
    nome: string;
    email: string;
    comissao: Float32Array;

}

type SignInProps = {
    email: string;
    senha: string;

}


type AuthProviderProps = {
    children: ReactNode;
}
export function signOut(){
  console.log('ueppa')
  try{
    destroyCookie(undefined, '@nextauth.token',{path:'/'})
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

export const AuthUserContext = createContext({} as AuthUserContextData)


export function AuthUserProvider({ children }: AuthProviderProps) {
    const [user,setUser] = useState<UserProps>()
    const isAuth = !!user

    useEffect(() => {
        
        // pegar dados no token
        const { '@nextauth.token':token } = parseCookies() ;
      
        if(token){
          api.get('/perfil').then(response => {
            const { id,nome, email,comissao} = response.data;
    
            setUser({
              id,nome,email,comissao
            })
          }).catch(() => {
            //em caso de erro, realiza o logout do usuario
            signOut()
          })
        }
      
      },[])

      async function signIn({ email, senha }: SignInProps){
        try{
          const response = await api.post('/acessar', {
            email,
            senha
          })
          // console.log(response.data);
          
          const { id, nome, comissao,token } = response.data;
          
          setCookie(undefined, '@nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
            path: "/" // Quais caminhos terao acesso ao cookie
          })
    
          setUser({
            id,
            comissao,
            nome,
            email,
            
          })
          
          
         
          //Passar para proximas requisiçoes o nosso token
          api.defaults.headers['Authorization'] = `Bearer ${token}`
    
          toast.success('Logado com sucesso!')
    
          //Redirecionar o user para /dashboard
          Router.push('/home')
    
    
        }catch(err){
          toast.error("Erro ao acessar!")
          console.log("ERRO AO ACESSAR ", err)
        }
      }

   

    return (
        <AuthUserContext.Provider value={{
            user, 
            isAuth,
            signIn,
            signOut,
        }}>
            {children}
        </AuthUserContext.Provider>
    )
}