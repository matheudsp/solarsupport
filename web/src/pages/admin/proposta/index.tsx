"use client"

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import Head from "next/head"
import React, { FormEvent, useEffect, useState } from "react";

import { CgFileDocument } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { BiIdCard } from 'react-icons/bi'
import { SlEnergy } from 'react-icons/sl'
import { MdAttachMoney } from 'react-icons/md'
import { toast } from "react-toastify";
import { canSSRAdmin } from "@/utils/canSSRAdmin";
import { BsFillFileEarmarkWordFill, BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { AiOutlineRedo } from 'react-icons/ai'

import { apiAdmin } from "@/services/apiClient";
import { setupAPIAdmin } from "@/services/apiAdmin";

import { BsGeoAlt } from 'react-icons/bs'
import { TbSolarPanel } from 'react-icons/tb'

type ProposalProps = {
  id: number;
  nome: string;
}


const ProposalList: ProposalProps[] = [
  { id: 1, nome: 'Manutenção' },
  { id: 2, nome: 'Prestação de Serviços' }
]

type sellerProps = {
  nome: string;
}

interface PageProps {
  SellerList: sellerProps[];

}

const clientTypeList = [
  { id: 1, nome: "CPF" },
  { id: 2, nome: "CNPJ" }
]
const stepList = [
  { nome: "Cliente" },
  { nome: "Equipamento" },
  { nome: "Responsável" },
  { nome: "Gerar Arquivo" },
]

export default function Proposta({ SellerList }: PageProps) {
  // INPUT STATES
  const [cliente, setCliente] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [clientType, setClientType] = useState(-1)
  const [clienteEmail, setClienteEmail] = useState('');
  const [mediaConsumo, setMediaConsumo] = useState('');
  const [potenciaProjeto, setPotenciaProjeto] = useState('');
  const [endereco, setEndereco] = useState('')
  const [houseNum, setHouseNum] = useState('')
  const [bairro, setBairro] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [equip1, setEquip1] = useState('')
  const [equip2, setEquip2] = useState('')
  const [responsavel, setResponsavel] = useState(-1);
  const [precoTotal, setPrecoTotal] = useState('');
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleProposal = () => {
    // await handleCreateMaintenance()
    setStep(3)
  }

  // PAGE STATES
  const [proposalSelected, setProposalSelected] = useState(-1);
  const [proposalCreated, setProposalCreated] = useState(false)
  const [BlobDOC, setBlobDOC] = useState(null)
  const [BlobPDF, setBlobPDF] = useState(null)
  const [loading, setLoading] = useState(false)
  const [buttonState, setButtonState] = useState(false)

  const blobpdf = new Blob([BlobPDF], { type: 'application/pdf' });
  const blobdoc = new Blob([BlobDOC], { type: 'application/msword' });
  const pdfurl = URL.createObjectURL(blobpdf)
  const docxurl = URL.createObjectURL(blobdoc)

  function handleChangeProposal(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione uma proposta" selecionada
      setProposalSelected(-1);

    } else {
      setProposalSelected(event.target.value)

    }

  }

  function handleChangeSeller(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setResponsavel(-1);

    } else {
      setResponsavel(event.target.value)

    }

  }

  function handleChangeClientType(event) {

    const selectedIndex = event.target.value;

    if (selectedIndex === "-1") {
      // Opção "Selecione um vendedor" selecionada
      setResponsavel(-1);

    } else {
      setClientType(event.target.value)

    }

  }
  function ResetBlob() {
    URL.revokeObjectURL(null);
    URL.revokeObjectURL(null);
  }

  function handleNewProposal() {
    setStep(0)
    setEndereco('')
    setBairro('')
    setCity('')
    setEndereco('')
    setHouseNum('')
    setClientType(-1)
    setEquip1('')
    setEquip2('')
    setCliente('');
    setClienteEmail('');
    setClienteId('');
    setMediaConsumo('');
    setPotenciaProjeto('');
    setPrecoTotal(''),
    setResponsavel(-1);
    setProposalCreated(false)
    ResetBlob()
  }

  async function handleCreateMaintenance(event: FormEvent) {
    ResetBlob()
    event.preventDefault();
    setBlobPDF(null)
    setBlobDOC(null)

    setLoading(true)


    if (cliente === '' || responsavel === -1 || precoTotal === '') {

      toast.error("Os campos com * devem ser respondidos.");

      setLoading(false)
      return;
    }

    let vendedor = SellerList[responsavel].nome

    let data = {
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    }




    try {
      const response = await apiAdmin.post('/admin/gerar-proposta/manutencao', data, { responseType: 'blob' })
      // console.log(response)
      if (response.status === 200) {
        setBlobDOC(response.data)

      }
      toast.success("Proposta gerada.")

    } catch (err) {
      console.log(err)
      toast.error('Erro ao gerar proposta. Contate o gerente do projeto!')
      setLoading(false)
      return
    }

    setProposalCreated(true)
    setLoading(false)
  }


  function handleDonwloadDOCX() {

    const link = document.createElement('a');
    link.href = docxurl;
    link.setAttribute('download', `proposta-${cliente.replace(/\s/g, '')}.docx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // async function handleDonwloadPDF() {
  //   setLoading(true) 
  //   try {
  //     const response = await apiAdmin.get('/admin/gerar-proposta/converter', { responseType: 'blob' })
  //     // console.log(response)
  //     if (response.status === 200) {
  //       setBlobPDF(response.data)



  //     }
  //   } catch (err) {
  //     console.log(err)
  //     toast.error('Erro ao gerar arquivo PDF. Contate o gerente do projeto!')
  //     setLoading(false)
  //     return
  //   }
  //   const link = document.createElement('a');
  //   link.href = pdfurl;
  //   link.setAttribute('download', `proposta-${cliente.replace(/\s/g, '')}.pdf`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   URL.revokeObjectURL(BlobPDF);
  //   setLoading(false)
  // }

  async function handleDonwloadPDF() {
    setLoading(true);
    try {
      const response = await apiAdmin.get('/admin/gerar-proposta/converter', { responseType: 'blob' });
      if (response.status === 200) {
        const blobPDF = new Blob([response.data], { type: 'application/pdf' });
        const urlPDF = URL.createObjectURL(blobPDF);
        window.open(urlPDF, "Proposta");

      }
    } catch (err) {
      console.log(err);
      toast.error('Erro ao gerar arquivo PDF. Contate o gerente do projeto!');
    }
    setLoading(false);
  }

  function formatCnpjCpf(value) {
    const inputValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (inputValue.length <= 11) {
      // Formata CPF
      const formattedCPF = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setClienteId(formattedCPF);
    } else {
      // Formata CNPJ
      const formattedCNPJ = inputValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      setClienteId(formattedCNPJ);
    }

  }
  const handleChangeCurrency = (event) => {
    const inputValue = event.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    const formattedMoney = formatCurrency(inputValue);
    setPrecoTotal(formattedMoney);
  };

  const formatCurrency = (value) => {
    const options = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    };

    const formatter = new Intl.NumberFormat('pt-BR', options);
    const formattedValue = formatter.format(value / 100); // Divide por 100 para considerar os centavos

    return formattedValue;
  };

  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <div className="bg-gray-300 flex min-h-screen">
        <Sidebar />
        <div className="w-10/12 mx-auto p-3 md:mt-10">

          <div className="md:px-6 md:pt-6 py-3 flex flex-row md:rounded-t-xl items-center md:bg-gray-50">
            <h1 className=" font-semibold text-xl md:text-2xl mr-1 md:mr-2 capitalize ">Gerar proposta </h1>
            <CgFileDocument className="" size={28} color="#000000" />
            <span className="text-blue-600 text-xs font-semibold ml-1 self-baseline">Beta v1.1</span>
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

            <h4 className="flex md:flex-row flex-col md:justify-start md:pl-3 md:text-xl justify-center font-bold text-lg items-center pt-2">Tipo de Proposta:
              {!ProposalList[''] && ProposalList[proposalSelected] && (
                <span className="ml-2 bg-blue-200 rounded-lg bg-opacity-50 text-blue-800 p-1.5 font-medium text-sm uppercase tracking-wider"> {ProposalList[proposalSelected].nome}</span>
              )}
            </h4>
            <p className="md:pl-3 text-sm mb-3">Para preparar uma proposta, forneça os dados necessários e clique em <span className="text-blue-600 font-medium">Gerar Proposta
            </span>.</p>


            {ProposalList[proposalSelected] && ProposalList[proposalSelected].id === 1 && (
              <form onSubmit={handleCreateMaintenance}>
                <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Cliente <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { setCliente(e.target.value) }} value={cliente} placeholder="Nome do cliente" ><FaRegUser /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">CPF/CNPJ do Cliente  <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { formatCnpjCpf(e.target.value) }} value={clienteId} placeholder="xxx.xxx.xxx-xx" ><BiIdCard /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Email do Cliente</span>
                    <Input type="text" onChange={(e) => { setClienteEmail(e.target.value) }} value={clienteEmail} placeholder="cliente@gmail.com" ><HiOutlineMail /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Média de Consumo Mensal</span>
                    <Input type="text" onChange={(e) => { setMediaConsumo(e.target.value) }} value={mediaConsumo} placeholder="Ex: 549 kWh" ><SlEnergy /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Potencia do Projeto</span>
                    <Input type="text" onChange={(e) => { setPotenciaProjeto(e.target.value) }} value={potenciaProjeto} placeholder="Ex: 655 kW" ><SlEnergy /></Input>
                  </div>
                  <div className="col-span-3 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Preço da proposta  <span className="text-red-600 font-medium">*</span></span>
                    <Input type="text" onChange={(e) => { handleChangeCurrency(e.target.value) }} value={precoTotal} placeholder="Ex: 1.200,49" ><MdAttachMoney /></Input>
                  </div>
                  <div className="col-span-6 relative">
                    <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Responsável pela proposta  <span className="text-red-600 font-medium">*</span></span>
                    <Select value={responsavel} onChange={handleChangeSeller}>
                      <option key={-1} value={-1}>Selecione o responsável</option>
                      {SellerList.map((item, index) => {
                        return (
                          <option key={index} value={index}>
                            {item.nome}
                          </option>
                        )
                      })}
                    </Select>
                  </div>


                </div>
                {proposalSelected !== -1 && (
                  <div className="flex justify-center md:justify-center p-1 w-full ">

                    <div className="md:w-4/12 w-6/12 flex flex-row items-center">

                      <Button

                        classname="w-full bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300"
                        type="submit"
                        loading={loading}

                      >Gerar Proposta<CgFileDocument className="ml-1" />
                      </Button>
                      {proposalCreated && (
                        <div onClick={handleNewProposal} className="text-white bg-[#ffbd03] rounded-lg ml-1 p-4 self-center">
                          <AiOutlineRedo className="mx-auto my-auto" size={18} />
                        </div>
                      )}

                    </div>


                  </div>
                )}

              </form>
            )}
            {ProposalList[proposalSelected] && ProposalList[proposalSelected].id === 2 && (

              <div className="md:px-6 rounded-lg  w-full lg:max-w-6xl">
                <h2 className="text-lg font-semibold text-center">Etapa {step + 1} - {stepList[step].nome} </h2>
                <div className="flex mb-4">

                  <div
                    className={`w-1/2 border-gray-400 rounded-l-3xl ${step === 0 ? "bg-blue-500 text-white" : "bg-gray-200 "
                      } p-2 text-center cursor-pointer`}
                    onClick={() => setStep(0)}
                  >
                    Etapa 1
                  </div>
                  <div
                    className={`w-1/2 ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                      } p-2 text-center cursor-pointer`}
                    onClick={() => setStep(1)}
                  >
                    Etapa 2
                  </div>
                  <div
                    className={`w-1/2 ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
                      } p-2 text-center cursor-pointer`}
                    onClick={() => setStep(2)}
                  >
                    Etapa 3
                  </div>
                  <div
                    className={`w-1/2 rounded-r-3xl ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
                      } p-2 text-center cursor-pointer`}
                    onClick={() => setStep(3)}
                  >
                    Etapa 4
                  </div>
                </div>

                <form>
                  {step === 0 && (
                    <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">

                      <div className="col-span-4 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Cliente <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setCliente(e.target.value) }} value={cliente} placeholder="Nome do cliente" ><FaRegUser /></Input>
                      </div>
                      <div className="col-span-3 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Tipo de Cliente <span className="text-red-600 font-medium">*</span></span>
                        <Select value={clientType} onChange={handleChangeClientType}>
                          <option key={-1} value={-1}>Selecione o tipo</option>
                          {clientTypeList.map((item, index) => {
                            return (
                              <option key={index} value={index}>
                                {item.nome}
                              </option>
                            )
                          })}
                        </Select>
                      </div>
                      <div className="col-span-5 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">CPF/CNPJ do Cliente <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { formatCnpjCpf(e.target.value) }} value={clienteId} placeholder="xxx.xxx.xxx-xx" ><BiIdCard /></Input>
                      </div>
                      <div className="col-span-4 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Endereço <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setEndereco(e.target.value) }} value={endereco} placeholder="Ex: Rua X" ><BsGeoAlt /></Input>
                      </div>
                      <div className="col-span-2 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Nº <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setHouseNum(e.target.value) }} value={houseNum} placeholder="Ex: 1438" ><BsGeoAlt /></Input>
                      </div>
                      <div className="col-span-2 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Bairro <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setBairro(e.target.value) }} value={bairro} placeholder="Ex: Meladão" ><BsGeoAlt /></Input>
                      </div>
                      <div className="col-span-2 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Sigla do Estado <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setState(e.target.value) }} value={state} placeholder="Ex: PI" ><BsGeoAlt /></Input>
                      </div>
                      <div className="col-span-2 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Cidade <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setCity(e.target.value) }} value={city} placeholder="Ex: Floriano" ><BsGeoAlt /></Input>
                      </div>

                    </div>
                  )}
                  {step === 1 && (
                    <div className="md:grid grid-cols-12 flex flex-col md:items-center md:gap-4 md:p-4 pb-3">
                      <div className="col-span-6 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Equipamento 1 <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setEquip1(e.target.value) }} value={equip1} placeholder="Ex: 22 PLACAS BIFACIAIS RENOSOLA" ><TbSolarPanel /></Input>
                      </div>
                      <div className="col-span-6 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Equipamento 2</span>
                        <Input type="text" onChange={(e) => { setEquip2(e.target.value) }} value={equip2} placeholder="Ex: 1 INVERSOR SUNGROW" ><TbSolarPanel /></Input>
                      </div>
                      <div className="col-span-6 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Média de Consumo Mensal em kWh <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setMediaConsumo(e.target.value) }} value={mediaConsumo} placeholder="Ex: 549" ><TbSolarPanel /></Input>
                      </div>
                      <div className="col-span-6 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Potencia do Projeto em kWp <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { setPotenciaProjeto(e.target.value) }} value={potenciaProjeto} placeholder="Ex: 655" ><SlEnergy /></Input>
                      </div>

                    </div>

                  )}
                  {step === 2 && (
                    <div className="flex flex-col items-center justify-center md:gap-4 md:p-4 pb-3">

                      <div className="md:w-3/6 relative">
                        <span className="md:absolute rounded-xl md:bg-gray-50 left-3 -top-[12px] px-2">Preço da proposta  <span className="text-red-600 font-medium">*</span></span>
                        <Input type="text" onChange={(e) => { handleChangeCurrency(e.target.value) }} value={precoTotal} placeholder="Ex: 1.200,49" ><MdAttachMoney /></Input>
                      </div>
                    </div>
                  )}

                </form>
                {step === 3 && !proposalCreated && proposalSelected !== -1 && (

                  <div className="flex justify-center md:justify-center p-1 w-full ">

                    <div className="md:w-4/12 w-full justify-center flex flex-row gap-x-2 ">

                      <Button
                        
                        classname={` md:w-3/6 ${buttonState ? (' bg-blue-800 hover:bg-blue-900') : ('bg-gray-500 cursor-not-allowed')}`}
                        type="button"
                        loading={loading}
                        onClick={handleDonwloadDOCX}
                      ><div className="font-semibold">DOC<BsFillFileEarmarkWordFill size={30} className="mx-auto"/></div></Button>

                      <Button
                        classname={` md:w-3/6 ${buttonState ? (' bg-red-700 hover:bg-red-800') : ('bg-gray-500 cursor-not-allowed')}`}
                        type="button"
                        loading={loading}
                        onClick={handleDonwloadPDF}
                      ><div className="font-semibold">PDF<BsFillFileEarmarkPdfFill size={30} className="mx-auto"  /></div></Button>
                      

                    </div>

                  </div>

                )}
                <div className="flex justify-between mt-6">
                  {step > 0 && (
                    <button
                      className="bg-gray-300 px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-400"
                      onClick={handleBack}
                    >
                      Voltar
                    </button>
                  )}
                  {step < 2 && (
                    <button
                      className="bg-blue-500 px-5 py-2.5 rounded-lg text-white hover:bg-blue-600"
                      onClick={handleNext}
                    >
                      Avançar
                    </button>
                  )}
                  {step > 2 && (
                    <button
                      className="bg-blue-500 px-5 py-2.5 rounded-lg text-white hover:bg-blue-600"
                      onClick={handleNewProposal}
                    >
                      Refazer
                    </button>
                  )}
                  {proposalSelected !== -1 && step === 2 && (
                    <Button
                      classname={`px-5 py-2.5 rounded-lg text-white bg-blue-500  hover:bg-blue-600`}
                      type="button"
                      loading={loading}
                      onClick={handleProposal}
                    >Gerar Proposta
                    </Button>
                  )}
                </div>

              </div>

            )}




          </div>
        </div>
      </div>

    </>
  )
}



export const getServerSideProps = canSSRAdmin(async (ctx) => {

  const apiAdmin = setupAPIAdmin(ctx)

  const response = await apiAdmin.get('/admin/usuarios/nome');

  return {
    props: {
      SellerList: response.data
    }
  }
})
