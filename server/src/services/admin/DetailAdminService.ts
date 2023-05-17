import prismaClient from "../../prisma";

class DetailAdminService{
  async execute(user_id: string){

    const findById = await prismaClient.admin.findFirst({
      where:{
        id: user_id
      },
      select:{
        id: true,
        nome: true,
        email: true,
      }
    })

    return findById;
  }
}

export { DetailAdminService }