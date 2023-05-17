import prismaClient from "../../prisma";

interface UserRequest{
    userId: string
    
}

class ListUserService{
    async execute({userId}: UserRequest){
        const findById = await prismaClient.vendedor.findMany({
            
            where:{
                id:userId
            },
            select:{
                id:true,
                nome: true,
                email: true,
                comissao: true,
            }

        })

        return findById;
    }
}

export { ListUserService}