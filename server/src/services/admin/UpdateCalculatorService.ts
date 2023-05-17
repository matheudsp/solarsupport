import prismaClient from "../../prisma";
interface calculatorRequest {
  potencia?: number
  id?: number,
  faixaInicial?: number,
  faixaFinal?: number,
  valorCusto?: string
}
class UpdateCalculatorService {
  async execute({ potencia, id, faixaInicial, faixaFinal, valorCusto }: calculatorRequest) {

    if (potencia) {
      const pot = await prismaClient.potenciaPlacas.update({
        where:{
          id:1
        },
        data: {
          potencia: potencia
        }
      })

      return pot;

    } else {
      const custo = await prismaClient.custoPorKWH.update({
        where: {
          id: id
        },
        data: {
          faixaInicial: faixaInicial,
          faixaFinal: faixaFinal,
          valorCusto: valorCusto
        }
      })

      return custo;
    }


  }
}

export { UpdateCalculatorService }