
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
import TableBody from "@/components/Table/TableBody";


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
  const [potencia, setPotencia] = useState(0);
  const [custo, setCusto] = useState('');

  const [loading, setLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(true)
  const [securityButton, setSecurityButton] = useState<boolean>(false)

  // const [users, setUsers] = useState(userList || []);
  const [userSelected, setUserSelected] = useState(-1)


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

    setCusto('');
    setPotencia(0);


    setLoading(false)
    setSecurityButton(false)
  }

  function handleChangeUser(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setUserSelected(-1);
      setCusto('');
      setPotencia(0);
    } else {
      setUserSelected(event.target.value)
      setCusto('');
      setPotencia(0);
    }
  }

  async function handleUpdate(event: FormEvent) {

    event.preventDefault();

    try {

      if (custo === '' || potencia === 0) {
        toast.error("É necessário os campos preenchidos.");
        return;
      }

      setLoading(true)


      if (potencia !== 0) {
        let data = {
          potencia: potencia
        }

        await apiAdmin.put('/admin/alterar', data)

      };




      toast.success("Modificação realizada.")
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
      <div className="bg-gray-300 flex h-auto">
        <Sidebar />


        <div className="w-10/12 mx-auto p-3 md:mt-10">

          <div className="md:px-6 md:pt-6 py-3 flex flex-row md:rounded-t-xl items-center md:bg-gray-50">
            <h1 className=" font-semibold text-xl md:text-2xl mr-1 md:mr-2 capitalize ">Alterar Calculdora</h1>
            <RiSettings4Fill className="cursor-pointer" size={28} color="#000000" />
          </div>
          <div className="md:p-6 p-3 rounded-xl md:rounded-t-none bg-gray-50">


            <div className="justify-center pb-4">

              
              <div className="flex flex-col md:flex-row justify-evenly ">
                <div className="md:w-4/12 md:mr-2 mr-0 md:mb-0 mb-2">
                  <div className="overflow-auto rounded-lg shadow">
                    <table className="w-full">
                      <thead className="bg-gray-200 border-b-2 border-gray-400 ">
                        <tr>
                          <th className="w-12 p-3 text-sm font-semibold tracking-wide text-left border-gray-400">Potência das Placas</th>
                          
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y">
                            <a className="font-bold text text-blue-500 ">{500}W</a>
                          </td>
                          
                        </tr>

                      </tbody>

                    </table>
                  </div>
                </div>
                <div className=" md:w-4/12">
                  <div className="overflow-hidden rounded-lg shadow ">
                    <table className="w-full">
                      <thead className="bg-gray-200 border-b-2 border-gray-400 ">
                        <tr>
                          <th className="w-12 p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-400">Custo(R$)</th>
                          <th className="w-18 p-3 text-sm font-semibold tracking-wide text-left  border-gray-400">Alcance(em kWh)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y border-r">
                            <a className="font-bold text text-blue-500 ">{30}</a>
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y">
                            {'1000 e 2000'}
                          </td>

                        </tr>

                      </tbody>

                    </table>
                  </div>
                </div>
              </div>


            </div>



            <div className="w-full border-t mb-2 md:border-gray-300 border-gray-400"></div>


            <p className="md:pl-3 text-sm mb-3">Para atualizar os dados da calculadora, altere apenas a informação preferida e clique em <span className="text-green-600 font-medium">salvar</span>. É importante lembrar que essas informações influenciam o cálculo de todos usuários.</p>
            
            <form onSubmit={handleUpdate}>
              <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Potência das Placas</span>
                  <Select onChange={handleChangeUser} value={potencia} placeholder="Selecione um vendedor" >
                    <option key={0} value={0}>{'Pontencia Atual : 500W'}</option>
                    <option key={1} value={330}>330W</option>
                    <option key={2} value={450}>450W</option>
                    <option key={3} value={455}>455W</option>
                    <option key={4} value={470}>470W</option>
                    <option key={5} value={550}>550W</option>
                    <option key={6} value={555}>555W</option>
                    <option key={7} value={565}>565W</option>
                    <option key={8} value={650}>650W</option>
                    <option key={9} value={655}>655W</option>
                  </Select>
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {0} e {500}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 34" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {501} e {1000}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 33" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {1001} e {2000}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 32.5" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {2001} e {3000}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 32" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {3001} e {4000}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 31.5" />
                </div>
                <div className="col-span-6 relative">
                  <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Custo entre {4001} e {5000}</span>
                  <Input type="text" onChange={(e) => { setCusto(e.target.value) }} disabled={!isEditable} value={custo} placeholder="Exemplo: 31" />
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