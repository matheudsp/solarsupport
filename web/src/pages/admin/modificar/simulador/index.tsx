
import Sidebar from "@/components/Sidebar";
import Head from "next/head"
import React, { FormEvent, HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";

import { canSSRAdmin } from "@/utils/canSSRAdmin";
import { setupAPIAdmin } from "@/services/apiAdmin";

import { RiSettings4Fill } from 'react-icons/ri'
import { AiFillDelete, AiFillSave } from 'react-icons/ai'

import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { apiAdmin } from "@/services/apiClient";
import TableBody from "@/components/Table/TableBody";


type CalcProps = {
  pot: PotProps;
  custo: CustoProps[];
}

type PotProps = {
  id: number,
  potencia: string
}



type CustoProps = {
  id: number;
  valorCusto: string;
  faixaInicial: number;
  faixaFinal: number;
}

interface PageProps {
  calcList: CalcProps;
}

export default function Modificar({ calcList }: PageProps) {
  const [potencia, setPotencia] = useState<number>(0);
  const [valorCusto, setValorCusto] = useState('')
  const [custoSelected, setCustoSelected] = useState<number>()
  const sortedListCusto = calcList.custo.sort((a, b) => a.faixaInicial - b.faixaFinal)


  const [mode, setMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditable, setIsEditable] = useState(true)
  const [securityButton, setSecurityButton] = useState<boolean>(false)


  function changeMode() {
    setPotencia(0)
    setValorCusto('')
    setMode(!mode)

  }

  function handleChangeButton() {
    setSecurityButton(!securityButton)
  }

  function handleChangeCusto(event) {

    if (event.target.value === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setValorCusto('')
    } else {
      setCustoSelected(event.target.value)

    }


  }

  function handleChangePot(event) {
    setPotencia(event.target.value)
  }

  async function handleUpdate(event: FormEvent) {

    event.preventDefault();

    try {


      if (mode === false && valorCusto === '') {
        toast.error("É necessário os campos preenchidos.");
        return;
      }
      if (mode === true && potencia === 0) {
        toast.error("É necessário selecionar uma potência.");
        return;
      }

      setLoading(true)


      if (potencia !== 0) {
        let data = {
          potencia: potencia.toString()
        }

        await apiAdmin.put('/admin/calculadora', data)
      }

      if (valorCusto !== '') {
        let data = {
          id: sortedListCusto[custoSelected].id,
          faixaInicial: sortedListCusto[custoSelected].faixaInicial,
          faixaFinal: sortedListCusto[custoSelected].faixaFinal,
          valorCusto: valorCusto
        }
        await apiAdmin.put('/admin/calculadora', data)
      }


      toast.success("Modificação realizada.")
      

    } catch (err) {
      console.log(err)
      toast.error('Erro ao modificar!')
    }

    setPotencia(0)
    setValorCusto('')
    setSecurityButton(false)
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
                            <a className="font-bold text text-blue-500 ">{calcList.pot[0].potencia}W</a>
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
                        {sortedListCusto.map((item) => (<tr key={item.id} className="bg-white">
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y border-r">
                            <a className="font-bold text text-blue-500 ">{item.valorCusto}</a>
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y">
                            {`${item.faixaInicial} e ${item.faixaFinal}`}
                          </td>

                        </tr>))}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>


            </div>



            <div className="w-full border-t mb-2 md:border-gray-300 border-gray-400"></div>

            {/* <h4 className="flex md:flex-row flex-col md:justify-start md:pl-3 md:text-xl justify-center font-bold text-lg items-center pt-2">Modificando 

             
              </h4> */}
              <p className="md:pl-3 text-sm mb-3">Para atualizar os dados do simulador, altere apenas a informação preferida e clique em <span className="text-green-600 font-medium">salvar</span>. É importante lembrar que essas informações influenciam o cálculo de todos usuários.</p>

              <form onSubmit={handleUpdate}>
                <h2 className="w-full justify-center flex mx-auto "><button onClick={changeMode} type="button" className="text-center p-2 rounded-xl text-xs font-medium bg-gray-300">Alternar para {(mode ? ('Potência'):('Custo'))}</button></h2>
                <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                  {mode ? (<div className="col-span-12 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Potência das Placas</span>
                    <Select onChange={handleChangePot} value={potencia} placeholder="Selecione uma potência" >
                      <option key={0} value={0}>{`Selecione uma potência`}</option>
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
                  </div>) : (

                    <div className="col-span-12 relative">
                      <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Alcance</span>
                      <Select onChange={handleChangeCusto} placeholder="Selecione o alcance" >
                        <option key={-1} value={-1}>Selecione o alcance</option>
                        {sortedListCusto.map((item, index) => (
                          <option key={item.id} value={index}>{item.faixaInicial} e {item.faixaFinal}</option>
                        ))}
                      </Select>



                      <div className="md:mt-4  mt-1 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Valor do kWh</span>
                        <Input type="number" onChange={(e) => { setValorCusto(e.target.value) }} value={valorCusto} placeholder={'Insira o custo do alcance selecionado'} />
                      </div>


                    </div>


                  )}





                </div>

                
              </form>
              <div className="flex justify-center md:justify-end p-1 w-full ">
                  <div className="md:w-3/12 w-8/12">
                  {!securityButton ? (<Button
                  style={{ backgroundColor: '#28a745' }}
                  type="button"
                  onClick={handleChangeButton}
                >Salvar <AiFillDelete className="ml-1" /></Button>) :
                  (<Button
                    style={{ backgroundColor: '#eed202 ' }}
                    type="submit"
                    loading={loading}
                    onClick={handleUpdate}
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

  const response = await apiAdmin.get('/calculadora');


  return {
    props: {
      calcList: response.data
    }
  }
})