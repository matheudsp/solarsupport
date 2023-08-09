
import Sidebar from "@/components/Sidebar";
import Head from "next/head"
import React, { FormEvent, useState } from "react";

import { canSSRAdmin } from "@/utils/canSSRAdmin";
import { setupAPIAdmin } from "@/services/apiAdmin";

import { RiSettings4Fill } from 'react-icons/ri'
import { AiFillDelete, AiFillSave } from 'react-icons/ai'

import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { apiAdmin } from "@/services/apiClient";


type UsersProps = {
  id: string;
  nome: string;
  email: string;
  comissao: string;
}

interface HomeProps {
  userList: UsersProps[];
}

export default function Modificar({ userList }: HomeProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [comissao, setComissao] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(true)
  const [securityButton, setSecurityButton] = useState<boolean>(false)

  const [users, setUsers] = useState(userList || []);
  const [userSelected, setUserSelected] = useState(-1)

  async function handleRefreshUsers() {
    const response = await apiAdmin.get('/admin/usuarios');
    setUsers(response.data);

  }
  function handleChangeButton() {
    setSecurityButton(!securityButton)
  }

  async function handleDelete() {
    setLoading(true)

    let data = {
      id: userList[userSelected].id
    }
    
    try {
      const response = await apiAdmin.delete('/admin/excluir', { data })
      toast.warning("Vendedor removido.")

    } catch (err) {
      console.log(err)
      toast.error('Erro ao modificar!')
    }

    setNome('');
    setEmail('');
    setComissao('');
    setSenha('');

    setLoading(false)
    setSecurityButton(false)
  }

  function handleChangeUser(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setUserSelected(-1);
      setNome("");
      setEmail("");
      setComissao("");
    } else {
      setUserSelected(event.target.value)
      setNome(users[event.target.value].nome)
      setEmail(users[event.target.value].email)
      setComissao(users[event.target.value].comissao)
    }
  }

  async function handleUpdate(event: FormEvent) {

    event.preventDefault();

    try {

      const data = new FormData();

      if (nome === '' || email === '' || comissao === '') {
        toast.error("É necessário os campos preenchidos.");
        return;
      }
      setLoading(true)

      data.append('userId', userList[userSelected].id);
      data.append('nome', nome);
      data.append('email', email);
      data.append('comissao', comissao)

      if (senha !== '') {
        data.append('senha', senha)
      };


      await apiAdmin.put('/admin/alterar', data)

      toast.success("Vendedor modificado com sucesso.")
      setLoading(false)



    } catch (err) {
      console.log(err)
      toast.error('Erro ao modificar!')
    }

    // setNome('');
    // setEmail('');
    // setComissao('');
    // setSenha('');

  }
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <div className="bg-gray-300 flex min-h-screen">
        <Sidebar />


        <div className="w-10/12 mx-auto p-3 md:mt-10">

          <div className="md:px-6 md:pt-6 py-3 flex flex-row md:rounded-t-xl items-center md:bg-gray-50">
            <h1 className=" font-semibold text-xl md:text-2xl mr-1 md:mr-2 capitalize ">Modificar Vendedor</h1>
            <RiSettings4Fill className="cursor-pointer" size={28} color="#000000" />
          </div>
          <div className="md:p-6 p-3 rounded-xl md:rounded-t-none bg-gray-50">


            <div className="md:flex justify-center pb-4">

              <span className="left-3 -top-[12px] font-semibold px-2 flex flex-row items-center ">Selecione um vendedor:</span>

              <div className="md:w-3/12">
                <Select value={userSelected} onChange={handleChangeUser}>
                  <option key={-1} value={-1}>Selecione um vendedor</option>
                  {userList.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.nome}
                      </option>
                    )
                  })}
                </Select>
                {/* <BiRefresh size={24} onClick={handleRefreshUsers}  /> */}
              </div>
            </div>
            <div className="w-full border-t mb-2 md:border-gray-300 border-gray-400"></div>

            <h4 className="flex md:flex-row flex-col md:justify-start md:pl-3 md:text-xl justify-center font-bold text-lg items-center pt-2">Dados do Vendedor:
              {!userList[''] && userList[userSelected] && (
                <span className="ml-2 bg-blue-200 rounded-lg bg-opacity-50 text-blue-800 p-1.5 font-medium text-sm uppercase tracking-wider"> {userList[userSelected].nome}</span>
              )}
            </h4>
            <p className="md:pl-3 text-sm mb-3">Para atualizar os dados do usuário, altere apenas a informação preferida e clique em <span className="text-green-600 font-medium">salvar</span>.</p>
            <form onSubmit={handleUpdate}>
              <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Nome</span>
                  <Input type="text" onChange={(e) => { setNome(e.target.value) }} disabled={!isEditable} value={nome} placeholder="Selecione um vendedor" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Comissão %</span>
                  <Input type="number" onChange={(e) => { setComissao(e.target.value) }} disabled={!isEditable} value={comissao} placeholder="Selecione um vendedor" />
                </div>
                <div className="col-span-6 relative" >
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">E-mail</span>
                  <Input type="email" onChange={(e) => { setEmail(e.target.value) }} disabled={!isEditable} value={email} placeholder="Selecione um vendedor" />
                </div>
                <div className="col-span-6 relative" >
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Alterar Senha</span>
                  <Input type="text" onChange={(e) => { setSenha(e.target.value) }} disabled={!isEditable} value={senha} placeholder="••••••••" />
                </div>



              </div>

              <div className="flex justify-center md:justify-end p-1 w-full ">
                <div className="md:w-3/12 w-8/12">
                  <Button
                    style={{ backgroundColor: '#28a745' }}
                    type="submit"
                    loading={loading}

                  >Salvar <AiFillSave className="ml-1" /></Button>


                </div>
              </div>
            </form>

            <div className="flex justify-center md:justify-end p-1 w-full ">
              <div className="md:w-3/12 w-8/12">
                {!securityButton ? (<Button
                  style={{ backgroundColor: '#d9534f' }}
                  type="button"
                  onClick={handleChangeButton}
                >Excluir <AiFillDelete className="ml-1" /></Button>) :
                  (<Button
                    style={{ backgroundColor: '#eed202 ' }}
                    type="button"
                    loading={loading}
                    onClick={handleDelete}
                  >Confirmar</Button>)
                }



              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAdmin(async (ctx) => {
  const apiAdmin = setupAPIAdmin(ctx)

  const response = await apiAdmin.get('/admin/usuarios');


  return {
    props: {
      userList: response.data
    }
  }
})