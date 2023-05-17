interface tableProps {
  
  nome: string;
  email: string;
  comissao: string;
}

import {HiOutlineMail} from 'react-icons/hi'
import {RiCoinLine} from 'react-icons/ri'

export default function TablePhone({nome, email, comissao }: tableProps) {
  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:hidden mb-2">
        <div className="bg-white space-y-3 p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2 text-sm w-full">
            <div className="w-8/12">
              <a className="text-blue-500 font-bold hover:underline">{nome}</a>
            </div>
            <div className="w-4/12 flex justify-end">
              <span
                className="p-1.5  text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Vendedor</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 flex flex-row items-center">
            <HiOutlineMail className='mr-1'/>{email}
          </div>
          <div className="text-sm font-medium text-black flex flex-row items-center">
            <RiCoinLine className='mr-1'/>Comissão: <span className="ml-1 text-purple-500 font-semibold">{comissao}</span>
          </div>

        </div>

      </div>
    </>
  );
};

