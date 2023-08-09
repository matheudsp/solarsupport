import prismaClient from "../../prisma";


class ListUsersNameService{
    async execute(){
        const findName = await prismaClient.vendedor.findMany({
            select:{
                nome:true,
            }

        })

        return findName;
    }
}

export { ListUsersNameService}