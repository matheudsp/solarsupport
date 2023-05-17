import { Button } from "@/components/ui/Button"
import { Input, Select } from "@/components/ui/Input"
import Head from "next/head"
import Image from "next/image"
// import logoImg from '../../public/'
import { Header } from "@/components/Header"
import { useState } from "react"
import { Result } from "@/components/ui/Result"
import { canSSRAuth } from "@/utils/canSSRAuth"
import { Footer } from "@/components/Footer"
import logo from '../../../public/logo09.png'
//examples


const potencia = 550
const custo = 33

export default function Calculadora() {

  const [geracao, setGeracao] = useState()
  const [valorSistema, setValorSistema] = useState(0)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleChangeResult(geracao) {
    setIsLoading(true)
    setGeracao(geracao)
    // const geracaoMensal = (130 * (potencia / 1000) * 15) * 30
    const valorSistema = geracao * custo
    const comissaoVendededor = valorSistema * 0.02
    setValorSistema(valorSistema + comissaoVendededor)
    setIsLoading(false)
  }
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <Header />
      <section className="bg-gray-300 w-full h-screen">
        {/* <Image src={logo} alt="bg" className="-z-50 "/> */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">

            <div className="px-6 pb-6 space-y-2 md:space-y-3">
              <h1 className="lg:text-lg md:text-2xl font-extrabold text-center pt-6">Calculadora</h1>
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
        </div>
        {/* <Footer /> */}
      </section>
    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
}
)