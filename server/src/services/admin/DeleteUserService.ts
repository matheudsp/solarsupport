import prismaClient from "../../prisma";

interface UserRequest{
  id: string;
}

class DeleteUserService{
  async execute( {id}: UserRequest){
    const user = await prismaClient.vendedor.delete({
      where:{
        id: id
      },
      select:{
        nome:false,
        email:false,
        comissao:false,
        senha:false,
        id:true
      }
    })

    return user;

  }
}

export { DeleteUserService }