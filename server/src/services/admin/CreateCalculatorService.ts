import prismaClient from '../../prisma'


interface CalculatorRequest {
    potencia?: number;
    faixaInicial?: number;
    faixaFinal?: number;
    valorCusto?: string
}

class CreateCalculatorService {
    async execute({ faixaInicial, faixaFinal, valorCusto, potencia }: CalculatorRequest) {

        if (potencia) {
            const pot = await prismaClient.potenciaPlacas.create({
                data: {
                    potencia: potencia
                }
            })
            return pot

        } else {
            const info = await prismaClient.custoPorKWH.create({
                data: {
                    faixaInicial: faixaInicial,
                    faixaFinal: faixaFinal,
                    valorCusto: valorCusto,

                }
            })
            return info;
        }


    }
}

export { CreateCalculatorService }