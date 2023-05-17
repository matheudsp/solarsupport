import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  senha: string;
}


class AuthAdminService{
  async execute({ email, senha }: AuthRequest){
    //Verificar se o email existe.
    const admin = await prismaClient.admin.findFirst({
      where:{
        email: email
      }
    })

    if(!admin){
      throw new Error("Usuário/senha incorreta")
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(senha, admin.senha)

    if(!passwordMatch){
      throw new Error("Usuário/senha incorreta")
    }


    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        nome: admin.nome,
        email: admin.email
      },
      process.env.JWT_SECRET,
      {
        subject: admin.id,
        expiresIn: '30d'
      }
    )


    return { 
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
      token: token
     }
  }
}

export { AuthAdminService };