import { BiExit } from 'react-icons/bi'
import React, { useState } from 'react';
import { signOut } from '@/contexts/UserContext';
import { FiMenu } from 'react-icons/fi'
import {ImPower} from 'react-icons/im'
import {BiHomeAlt2} from 'react-icons/bi'
import Link from 'next/link';
import Logo from '../ui/Logo';
import { Transition } from "@headlessui/react";

const menus = [
  { name: "Início", link: "/home"},
  { name: "Calculadora", link: "/calculadora"},
  { name: "Sair", link: "/", ico: BiExit, fn: signOut }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    
      <nav className="bg-gray-50 shadow">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-row items-center justify-between h-16 ">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex-shrink-0">
                <Logo className="w-28"/>
              </div>
              <div className="hidden md:block">
                <div className="ml-10  items-baseline space-x-8 mx-auto flex flex-row ">
                  {menus?.map((menu, i) => (
                    <Link
                      href={menu.link}
                      key={i}
                      onClick={menu.fn}
                      className=" hover:bg-gray-300 text-slate-600 px-3 py-2 rounded-md text-base font-medium items-center flex flex-row"
                    > 
                      {menu.name}
                      {menu.ico && <div className='ml-1'>{React.createElement(menu?.ico, { size: "18" })}</div>}
                    </Link>))}

                    
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menus?.map((menu,i) => (<Link
                  href={menu.link}
                  className="hover:bg-gray-300 text-center text-slate-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {menu.name}
                </Link>))}


              </div>
            </div>
          )}
        </Transition>
      </nav>

    

  )
}

