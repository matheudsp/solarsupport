import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Head from "next/head"
import Image from "next/image"
// import logoImg from '../../public/'
import { Header } from "@/components/Header"
import { FormEvent, useState, useContext } from "react"
import { Footer } from "@/components/Footer"

import { AuthAdminContext } from "@/contexts/AdminContext"
import {AiOutlineUserSwitch} from 'react-icons/ai'
import Link from "next/link"

import { canSSRGuest } from "@/utils/canSSRGuest"
import { toast } from "react-toastify"
import Logo from "@/components/ui/Logo"


export default function admin() {
  const {signIn, admin, isAdminAuth} = useContext(AuthAdminContext)
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false)

  function togglePassword(){
    setPasswordShown(!passwordShown);
  }
  async function handleLogin(event:FormEvent){
    event.preventDefault()

    if(email == '' || senha === ''){
      toast.error("Não se esqueça de preencher todos os campos.")
      return
    }

    setLoading(true);

    let data = {
      email, senha
    }
    await signIn(data)

    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <section className="bg-gray-300 h-screen">
        
        <div className="flex flex-col items-center justify-center px-6 py-8 h-screen mx-auto lg:py-0">
          
        <Logo className="mb-5 -mt-5 md:w-48 w-36" />
          <div className="w-full bg-white rounded-lg shadow mb-2  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight  text-gray-900 md:text-2xl">
                Bem-vindo, admin
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Seu e-mail</label>
                  <Input
                    placeholder="nome@gmail.com"
                    required
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => {setEmail(e.target.value)}}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                  <Input
                    placeholder="••••••••"
                    required
                    type={passwordShown ? "text" : "password"}
                    value={senha}
                    autoComplete="current-password"
                    onChange={(e) => {setSenha(e.target.value)}}


                  />
                </div>
                <div className="flex flex-row items-center justify-start">
                  <input type="checkbox" defaultChecked={false} onClick={togglePassword} className="checked:bg-primary-600"/>
                  <label className="block text-sm ml-2 font-medium text-gray-900">Mostrar Senha</label>
                </div>
                <Button 
                  type="submit"
                  loading={loading}
                  onClick={handleLogin}
                  >Entrar</Button>
                
                
                <Link href="/" className="flex flex-row items-center font-medium text-primary-600 hover:underline">
                  Acessar como usuário <AiOutlineUserSwitch className="ml-1" color={'#ca8a04'} size={18} />
                </Link>
                
              </form>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
        
      </section>
      
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
