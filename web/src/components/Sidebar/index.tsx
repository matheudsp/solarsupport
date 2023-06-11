import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbDoorExit } from "react-icons/tb"
import {CgFileDocument} from 'react-icons/cg'
import {TbSolarPanel} from 'react-icons/tb'
import Link from "next/link";
import { signOutAdmin } from "@/contexts/AdminContext";

export default function Sidebar() {
    

    const menus = [
        { name: "Painel de Vendedores", link: "/admin/painel", icon: HiUserGroup },
        { name: "Modificar Vendedor", link: "/admin/modificar", icon: RiSettings4Line },
        { name: "Cadastrar Vendedor", link: "/admin/cadastrar", icon: AiOutlineUserAdd },
        { name: "Alterar Simulador", link: "/admin/modificar/simulador", icon: TbSolarPanel },
        { name: "Gerar Contrato", link: "/admin/proposta", icon: CgFileDocument },
        { name: "Sair", function: signOutAdmin,link:'/admin', icon: TbDoorExit, margin: true },
    ];
    const [open, setOpen] = useState(false);

    return (

        <div
            className={`bg-[#08438f] min-h-screen ${open ? "w-72 absolute md:static " : "w-16"
                } duration-300 text-gray-100 px-4 z-50 `}
        >
            <div className="py-3 flex justify-end">
                
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer"
                    color="#FFFFFF"
                    onClick={() => setOpen(!open)}
                />
            </div>
            
            <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu, i) => (
                    <Link
                        onClick={menu?.function}
                        href={menu?.link}
                        key={i}
                        className={` ${menu?.margin && "mt-5"
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-primary-600 rounded-md`}
                    >
                        <div>{React.createElement(menu?.icon, { size: "20", color: "#FFFFFF" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${i + 3}00ms`,
                            }}
                            className={`whitespace-pre duration-500 text-white ${!open && "opacity-0 translate-x-28 overflow-hidden "
                                }`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
            </div>
           

        </div>



    )
}
