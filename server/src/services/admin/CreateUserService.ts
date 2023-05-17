import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    nome: string;
    email: string;
    senha: string;
    comissao: string
}

class CreateUserService {
    async execute({ nome, email, senha,comissao }: UserRequest) {

        // verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto.")
        }

        //Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.vendedor.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Usuário existente.")
        }

        const passwordHash = await hash(senha, 8)

        const user = await prismaClient.vendedor.create({
            data: {
                nome: nome,
                email: email,
                senha: passwordHash,
                comissao: comissao
            },
            select: {
                id: true,
                nome: true,
                email: true,
                comissao:true
            }
        })


        return user;
    }
}

export { CreateUserService }