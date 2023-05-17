import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
  email: string;
  senha: string;
}


class AuthUserService{
  async execute({ email, senha }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.vendedor.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("Usuário/senha incorreta")
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(senha, user.senha)

    if(!passwordMatch){
      throw new Error("Usuário/senha incorreta")
    }


    // Se deu tudo certo vamos gerar o token pro usuario.
    const token = sign(
      {
        nome: user.nome,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )


    return { 
      id: user.id,
      nome: user.nome,
      email: user.email,
      comissao: user.comissao,
      token: token
     }
  }
}

export { AuthUserService };