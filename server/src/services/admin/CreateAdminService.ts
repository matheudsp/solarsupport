import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface AdminRequest {
    nome: string;
    email: string;
    senha: string;
}

class CreateAdminService {
    async execute({ nome, email, senha }: AdminRequest) {

        // verificar se ele enviou um email
        if (!email) {
            throw new Error("Email incorreto.")
        }

        //Verificar se esse email já está cadastrado na plataforma
        const AdminAlreadyExists = await prismaClient.admin.findFirst({
            where: {
                email: email
            }
        })

        if (AdminAlreadyExists) {
            throw new Error("Usuário existente.")
        }

        const passwordHash = await hash(senha, 8)

        const admin = await prismaClient.admin.create({
            data: {
                nome: nome,
                email: email,
                senha: passwordHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            }
        })


        return admin;
    }
}

export { CreateAdminService }