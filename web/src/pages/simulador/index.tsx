import { Button } from "@/components/ui/Button"
import { Input, Select } from "@/components/ui/Input"
import Head from "next/head"
import Image from "next/image"
// import logoImg from '../../public/'
import { Header } from "@/components/Header"
import { useContext, useState } from "react"
import { Result } from "@/components/ui/Result"
import { canSSRAuth } from "@/utils/canSSRAuth"
import { Footer } from "@/components/Footer"
import logo from '../../../public/logo09.png'
import { setupAPIClient } from "@/services/api"
import { AuthUserContext } from "@/contexts/UserContext"

// dados a receber da requisicao da api
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

export default function Simulador({calcList}:PageProps) {
  const {user} = useContext(AuthUserContext)
  const [geracao, setGeracao] = useState()
  const [valorSistema, setValorSistema] = useState(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleChangeResult(geracao: any) {
    setIsLoading(true)
    setGeracao(geracao)
    let custo;
    for (const alcance of calcList.custo){
      if(geracao >= alcance.faixaInicial && geracao <= alcance.faixaFinal){
        custo = parseFloat(alcance.valorCusto);
        break;
      }
    }

    const valorSistema = geracao * custo
    const comissaoVendededor = valorSistema * (parseFloat(user.comissao)/100)

    setValorSistema(valorSistema + comissaoVendededor)
    setIsLoading(false)
  }
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
     
      <section className="bg-gray-300 w-full h-screen">
      <Header />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">

            <div className="px-6 pb-6 space-y-2 md:space-y-3">
              <h1 className="lg:text-lg md:text-2xl font-extrabold text-center pt-6">Simulador de Projetos </h1>
              <label className="block mb-2 text-sm font-medium text-gray-900">Geração Esperada do Sistema(em kWh)</label>
              <Input
                placeholder="Ex: 1000 kWh"
                type="number"
                value={geracao}
                onChange={(e) => { handleChangeResult(e.target.value) }}
              />


              <div className="flex-col space-y-2">
                <Result loading={isLoading} label="Valor do Sistema">
                  {valorSistema.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}
                </Result>

              </div>
            </div>
          </div>
          {/* <div className="w-full mt-5 bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-2 md:space-y-3">
            Sugestão de Sistema
            inversor de 6kwp
            14 placas de 555W
          </div>
          </div> */}
        </div>
        {/* <Footer /> */}
      </section>
    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  
  const response = await apiClient.get('/calculadora')
  return({
    props:{
      calcList: response.data
    }
  })
}
)