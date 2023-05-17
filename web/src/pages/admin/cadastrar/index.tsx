
import Sidebar from "@/components/Sidebar";
import Head from "next/head"
import React, { FormEvent, useContext, useState } from "react";

import { canSSRAdmin } from "@/utils/canSSRAdmin";

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { HiUserAdd } from 'react-icons/hi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { AuthAdminContext } from "@/contexts/AdminContext";




export default function alterar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [comissao, setComissao] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  const [loading, setLoading] = useState(false)
  const { signUpUser } = useContext(AuthAdminContext)

  function togglePassword() {
    setPasswordShown(!passwordShown);
  }



  async function handleCreate(event: FormEvent) {

    setLoading(true)
    event.preventDefault();

    let data = {
      nome,
      email,
      comissao,
      senha
    }

    if (nome === '' || email === '' || comissao === '' || senha === '') {
      toast.error("Preencha todos os campos.");
      setLoading(false)
      return;
    }

    await signUpUser(data)


    setNome('');
    setEmail('');
    setComissao('');
    setSenha('');
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <div className="bg-gray-300 flex h-auto">
        <Sidebar />


        <div className="w-10/12 mx-auto p-3 md:mt-10">

          <div className="md:px-6  md:pt-6 py-3 flex flex-row md:rounded-t-xl items-center md:bg-gray-50">
            <h1 className=" font-semibold text-xl md:text-2xl mr-1 md:mr-2 capitalize ">Cadastrar Vendedor</h1>
            <HiUserAdd className="cursor-pointer" size={28} color="#000000" />
          </div>
          <div className="md:p-6 p-3 rounded-xl md:rounded-t-none bg-gray-50">

            <h4 className="flex md:flex-row flex-col md:justify-start md:pl-3 md:text-xl justify-center font-bold text-lg items-start pt-2">
              Adicionar novo vendedor
            </h4>
            <p className="md:pl-3 text-sm mb-3">Crie uma conta nova para ter acesso ao sistema.</p>
            <form onSubmit={handleCreate}>
              <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Nome</span>
                  <Input type="text"
                    onChange={(e) => { setNome(e.target.value) }}
                    value={nome}
                    autoComplete="username"
                    placeholder="Fulano Silva" />
                </div>
                <div className="col-span-6 relative" >
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">E-mail</span>
                  <Input
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                    autoComplete="username"
                    placeholder="exemplo@gmail.com" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Comissão %</span>
                  <Input
                    type="number"
                    
                    onChange={(e) => { setComissao(e.target.value) }}
                    value={comissao}
                    placeholder="Ex: 5%"
                  />
                </div>
                <div className="col-span-6 relative" >
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Senha</span>

                  <div className="flex flex-row items-center">
                    <Input
                      type={passwordShown ? "text" : "password"}
                      
                      onChange={(e) => { setSenha(e.target.value) }} autoComplete="current-password"
                      value={senha}
                      placeholder="••••••••"
                    />
                    <div className="-ml-8 text-gray-500 ">
                      {passwordShown ?
                        (<AiFillEyeInvisible className="animate-pulse-toggle" size={24} onClick={togglePassword} />) :
                        (<AiFillEye className="animate-pulse-toggle" onClick={togglePassword} size={24} />)
                      }
                    </div>

                  </div>

                </div>



              </div>

              <div className="flex justify-center md:justify-end md:p-4 w-full ">
                <div className="">
                  <Button
                    style={{ backgroundColor: '#24a0ed' }}
                    type="submit"
                    loading={loading}
                  // onClick={}
                  >Cadastrar <BsPersonFillAdd className="ml-1" /></Button>

                </div>
              </div>
            </form>

           

          </div>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAdmin(async (ctx) => {

  return {
    props: {

    }
  }
})