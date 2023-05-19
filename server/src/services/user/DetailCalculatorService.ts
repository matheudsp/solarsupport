import prismaClient from "../../prisma";

class DetailCalculatorService {
  async execute() {

    const pot = await prismaClient.potenciaPlacas.findFirst()

    const custo = await prismaClient.custoPorKWH.findMany({
      select:{
        id:true,
        valorCusto:true,
        faixaInicial:true,
        faixaFinal:true
        
      }
    })

    return {pot,custo};
  }
}

export { DetailCalculatorService }