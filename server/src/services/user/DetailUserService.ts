import prismaClient from "../../prisma";

class DetailUserService{
  async execute(user_id: string){

    const user = await prismaClient.vendedor.findFirst({
      where:{
        id: user_id
      },
      select:{
        id: true,
        nome: true,
        email: true,
        comissao:true
      }
    })

    return user;
  }
}

export { DetailUserService }