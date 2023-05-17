
import Sidebar from "@/components/Sidebar";
import TableBody from "@/components/Table/TableBody";
import TablePhone from "@/components/Table/TablePhone";
import Head from "next/head"
import React, { useState } from "react";

import { canSSRAdmin } from "@/utils/canSSRAdmin";
import { setupAPIAdmin } from "@/services/apiAdmin";

import { HiUserGroup } from 'react-icons/hi'
import { destroyCookie } from "nookies";
import Router from "next/router";


type UsersProps = {
  id: string;
  nome: string;
  email: string;
  comissao: string
}

interface HomeProps {
  users: UsersProps[];
}

export default function painel({ users }: HomeProps) {

  const [userList, setUserList] = useState(users || []);

  return (
    <>
      <Head>
        <title>Solar Support - Solução completa em geradores fotovoltaicos</title>
      </Head>
      <div className="bg-gray-300 flex h-auto">
        <Sidebar />
        <div className="w-10/12 mx-auto p-3">
          <div className=" md:p-6 md:bg-gray-50 md:mt-10 md:rounded-xl">
            <div className="py-3 pb-6 flex flex-row items-center">
              <h1 className=" font-semibold text-2xl mr-2 capitalize ">Painel de Vendedores</h1>
              <HiUserGroup className="cursor-pointer " size={28} color="#000000" />
            </div>

            {/* tabela a ser renderizada em desktop */}
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-200 border-b-2 border-gray-400 ">
                  <tr>
                    <th className="w-12 p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-400">ID</th>
                    <th className="w-18 p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-400">Nome e Sobrenome</th>
                    <th className="w-18 p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-400">Email</th>
                    <th className="w-18 p-3 text-sm font-semibold tracking-wide text-left ">Comissão</th>

                  </tr>
                </thead>
                {/* {userList[''] ? (
                  userList.map((item, index) => {
                    return (
                      <TableBody key={index} id={index + 1} nome={item.nome} email={item.email} comissao={item.comissao} />
                    )
                  })
                ) : (<div className="hidden md:block"><TableBody  key={0} nome="Nenhum usuário cadastrado" /></div>)} */}
                {userList.map((item, index) => {
                  return (
                    <TableBody key={index} id={index + 1} nome={item.nome} email={item.email} comissao={item.comissao} />
                  )
                })}
              </table>
            </div>
            {/* tabela a ser renderizada em celulares */}
            {!userList[''] ? (
              userList.map((item, index) => {
                return (
                  <TablePhone key={index} nome={item.nome} email={item.email} comissao={item.comissao + "%"} />
                )
              })
            ) : (<h2 className="block md:hidden">Nenhum usuário cadastrado...</h2>)}


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
        users: response.data
      }
    }
  })