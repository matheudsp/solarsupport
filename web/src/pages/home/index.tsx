
import Head from "next/head"
// import logoImg from '../../public/'
import { Header } from "@/components/Header"

import { canSSRAuth } from "@/utils/canSSRAuth";
import Link from "next/link";

export default function Home() {
  
  
  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <Header />
      <section className="bg-gray-300 w-full h-screen">
        
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">

            <div className="px-6 pb-6 space-y-2 md:space-y-3">
              <h1 className="lg:text-lg md:text-2xl font-bold text-center pt-6">Menu Rápido</h1>
              
                        <ul className="flex flex-col mt-4 font-medium ">
                            <li>
                                <Link href="/home" className="block py-2 pr-4 pl-3 text-white lg:text-gray-700 rounded bg-primary-700 lg:bg-white hover:text-primary-700 border-b border-gray-100 hover:bg-gray-100" aria-current="page">Página Inicial</Link>
                            </li>
                            <li>
                                <Link href="/calculadora" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-700 hover:bg-gray-100 ">Calculadora</Link>
                            </li>                            
                            {/* <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-700 hover:bg-gray-100  ">Preciso de Ajuda</a>
                            </li> */}
                        </ul>
                    </div>
            
            
          </div>
        </div>

      </section>

    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return{
      props:{}
  }
}
)