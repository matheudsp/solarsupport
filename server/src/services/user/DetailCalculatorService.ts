import prismaClient from "../../prisma";

class DetailCalculatorService {
  async execute() {

    const pot = await prismaClient.potenciaPlacas.findMany({
      select: {
        id:true,
        potencia: true
      }
    })

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