import { createContext, ReactNode, useEffect, useState } from 'react';

import { apiAdmin } from '../services/apiClient';
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { toast } from 'react-toastify'


type AuthAdminContextData = {
    admin: UserProps;
    isAdminAuth: boolean;
    signIn: (credentials: SignInProps) => Promise<void>
    signOutAdmin: () => void;
    signUpUser: (credentials: SignUpProps) => Promise<void>;

}

type UserProps = {
    id: string;
    nome: string;
    email: string;

}

type SignInProps = {
    email: string;
    senha: string;

}

type SignUpProps = {
    nome: string;
    email: string;
    senha: string;
    comissao: string
  }
  

type AuthProviderProps = {
    children: ReactNode;
}

export function signOutAdmin(){
  try{
    destroyCookie(null, '@nextauth.tokenAdmin',{
      path:'/'
    })
    Router.push('/admin')
    
  }catch(err){
    console.log('erro ao deslogar',err)
  }
}


export const AuthAdminContext = createContext({} as AuthAdminContextData)

export function AuthAdminProvider({ children }: AuthProviderProps) {
    const [admin,setAdmin] = useState<UserProps>()
    const isAdminAuth = !!admin

    
    useEffect(() => {
        
      // pegar dados no token
      const { '@nextauth.tokenAdmin':token } = parseCookies() ;
    
      if(token){
        apiAdmin.get('/admin/perfil').then(response => {
          const { id,nome, email} = response.data;
  
          setAdmin({
            id,nome,email
          })
        }).catch(() => {
          //em caso de erro, realiza o logout do usuario
          signOutAdmin()
        })
      }
    
    },[])

    

      async function signIn({ email, senha }: SignInProps){
        try{
          const response = await apiAdmin.post('/admin', {
            email,
            senha
          })
          
    
          const { id, nome, token } = response.data;
    
          setCookie(null, '@nextauth.tokenAdmin', token, {
            maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
            path: "/",
             // Quais caminhos terao acesso ao cookie
          })
    
          setAdmin({
            id,
            nome,
            email,
          })
    
          //Passar para proximas requisiçoes o nosso token
          apiAdmin.defaults.headers['Authorization'] = `Bearer ${token}`
    
          toast.success('Logado com sucesso!')
    
          //Redirecionar o user para /admin/painel
          Router.push('/admin/painel')
    
    
        }catch(err){
          toast.error("Erro ao acessar!")
          console.log("ERRO AO ACESSAR ", err)
        }
      }
    
   

    async function signUpUser({ nome, email, senha,comissao}: SignUpProps){
        try{
          
          const response = await apiAdmin.post('/admin/criarUsuario', {
            nome,
            email,
            senha,
            comissao
          })
    
          toast.info("Conta criada com sucesso!")
    
    
        }catch(err){
          toast.error("Erro ao cadastrar!")
          console.log("erro ao cadastrar ", err)
        }
      }

    return (
        <AuthAdminContext.Provider value={{
            admin, 
            isAdminAuth,
            signIn,
            signOutAdmin,
            signUpUser,
   
        }}>
            {children}
        </AuthAdminContext.Provider>
    )
}