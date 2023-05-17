import prismaClient from "../../prisma";


class ListUsersService{
    async execute(){
        const findAll = await prismaClient.vendedor.findMany({
            select:{
                id:true,
                nome:true,
                comissao:true,
                email:true,
                
            }

        })

        return findAll;
    }
}

export { ListUsersService}