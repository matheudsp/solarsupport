interface tableProps {
  id?:number
  nome: string;
  email?: string;
  comissao?: string;
}

export default function TableBody({id, nome, email, comissao }: tableProps) {
  
  return (
    <>

      <tbody className="divide-y divide-gray-100">
        <tr className="bg-white">
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y">
            <a className="font-bold text text-blue-500 ">{id}</a>
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap border-y">
            {nome}
          </td>
          <td className="p-3 text-sm text-gray-500 whitespace-nowrap border-y">{email}</td>

          <td className="p-3 text-center text-sm text-purple-700 font-bold whitespace-nowrap border-y">{comissao}</td>

        </tr>

      </tbody>




    </>

  );
};

