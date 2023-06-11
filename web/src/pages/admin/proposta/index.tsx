
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import Head from "next/head"
import React, { FormEvent, useState } from "react";

import { CgFileDocument } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { BiIdCard } from 'react-icons/bi'
import { SlEnergy } from 'react-icons/sl'
import { MdAttachMoney } from 'react-icons/md'
import { toast } from "react-toastify";
import { canSSRAdmin } from "@/utils/canSSRAdmin";
import { setupAPIAdmin } from "@/services/apiAdmin";
import { apiAdmin } from "@/services/apiClient";

type ProposalProps = {
  id: number;
  nome: string;
}


const ProposalList: ProposalProps[] = [
  { id: 1, nome: 'Manutenção' }
]

export default function Proposta() {
  const [cliente, setCliente] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [mediaConsumo, setMediaConsumo] = useState('');
  const [potenciaProjeto, setPotenciaProjeto] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [precoTotal, setPrecoTotal] = useState('');

  const [proposalSelected, setProposalSelected] = useState(-1);

  const [loading, setLoading] = useState(false)

  function handleChangeProposal(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setProposalSelected(-1);

    } else {
      setProposalSelected(event.target.value)

    }

  }

  async function handleCreate(event: FormEvent) {

    setLoading(true)
    event.preventDefault();

    let data = {
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    }

    if (cliente === '' || vendedor === '' || precoTotal === '') {
      toast.error("Os campos com * devem ser respondidos.");
      setLoading(false)
      return;
    }


    try {
      const response = await apiAdmin.post('/admin/gerar-proposta/manutencao', data , { responseType: 'blob' })
      // console.log(response)
      if (response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'proposta.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

      }
      toast.success("Proposta gerada.")

    } catch (err) {
      console.log(err)
      toast.error('Erro ao gerar proposta. Contate o gerente do projeto!')
    }

    setCliente('');
    setClienteEmail('');
    setClienteId('');
    setMediaConsumo('');
    setPotenciaProjeto('');
    setPrecoTotal(''),
      setVendedor('');

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
            <h1 className=" font-semibold text-xl md:text-2xl mr-1 md:mr-2 capitalize ">Gerar proposta </h1>
            <CgFileDocument className="" size={28} color="#000000" />
            <span className="text-blue-600 text-xs font-semibold ml-1 self-baseline">Beta v1.0</span>
          </div>
          <div className="md:p-6 p-3 rounded-xl md:rounded-t-none bg-gray-50">


            <div className="md:flex justify-center pb-4">

              <span className="left-3 -top-[12px] font-semibold px-2 flex flex-row items-center ">Tipo de proposta:</span>

              <div className="md:w-3/12">
                <Select value={proposalSelected} onChange={handleChangeProposal}>
                  <option key={-1} value={-1}>Selecione o tipo</option>
                  {ProposalList.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {item.nome}
                      </option>
                    )
                  })}
                </Select>
              </div>
            </div>
            <div className="w-full border-t mb-2 md:border-gray-300 border-gray-400"></div>

            <h4 className="flex md:flex-row flex-col md:justify-start md:pl-3 md:text-xl justify-center font-bold text-lg items-center pt-2">Dados da Proposta:
              {!ProposalList[''] && ProposalList[proposalSelected] && (
                <span className="ml-2 bg-blue-200 rounded-lg bg-opacity-50 text-blue-800 p-1.5 font-medium text-sm uppercase tracking-wider"> {ProposalList[proposalSelected].nome}</span>
              )}
            </h4>
            <p className="md:pl-3 text-sm mb-3">Para preparar uma proposta, forneça os dados necessários e clique em <span className="text-blue-600 font-medium">Gerar Proposta</span>.</p>
            <form onSubmit={handleCreate}>

              {ProposalList[proposalSelected] && ProposalList[proposalSelected].id === 1 && (
                <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Cliente <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { setCliente(e.target.value) }} value={cliente} placeholder="Nome do cliente" ><FaRegUser /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">CPF/CNPJ do Cliente  <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { setClienteId(e.target.value) }} value={clienteId} placeholder="xxx.xxx.xxx-xx" ><BiIdCard /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Email do Cliente</span>
                    <Input type="text" onChange={(e) => { setClienteEmail(e.target.value) }} value={clienteEmail} placeholder="cliente@gmail.com" ><HiOutlineMail /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Média de Consumo Mensal</span>
                    <Input type="text" onChange={(e) => { setMediaConsumo(e.target.value) }} value={mediaConsumo} placeholder="Ex: 549 kWh" ><SlEnergy /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Média de Consumo Mensal</span>
                    <Input type="text" onChange={(e) => { setPotenciaProjeto(e.target.value) }} value={potenciaProjeto} placeholder="Ex: 655 kW" ><SlEnergy /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Responsável pela proposta  <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { setVendedor(e.target.value) }} value={vendedor} placeholder="Nome do vendedor" ><FaRegUser /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Preço da proposta  <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { setPrecoTotal(e.target.value) }} value={precoTotal} placeholder="Ex: 1.200,49" ><MdAttachMoney /></Input>
                  </div>

                </div>
              )}

              <div className="flex justify-center md:justify-end p-1 w-full ">
                <div className="md:w-3/12 w-8/12">
                  <Button
                    style={{ backgroundColor: '#24a0ed' }}
                    type="submit"
                    loading={loading}

                  >Gerar Proposta<CgFileDocument className="ml-1" /></Button>


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
    props: {}
  }
})
