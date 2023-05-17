import prismaClient from "../../prisma";
import { hash,compare } from 'bcryptjs'

interface UsersRequest{
  userId: string;
  nome?:string,
  email?:string,
  senha?:string,
  comissao?: string
}

class UpdateUsersService{
  async execute( {userId,nome, email,senha,comissao}: UsersRequest){

    if(senha){
      senha = await hash(senha, 8)
    }

    const users = await prismaClient.vendedor.update({
      where:{
        id: userId
      },
      data:{
        nome:nome,
        senha:senha,
        email:email,
        comissao:comissao
        
      }
    })

    return users;

  }
}

export { UpdateUsersService }