import {Request, response, Response} from 'express'
import { CreateCalculatorService } from '../../services/admin/CreateCalculatorService';

class CreateCalculatorController{
  async handle(req: Request, res: Response){
    const { potencia, faixaFinal,faixaInicial, valorCusto } = req.body;

    const createCalculatorService = new CreateCalculatorService();

    const admin = await createCalculatorService.execute({
      potencia,
      faixaInicial,
      faixaFinal,
      valorCusto
    });

    return res.json(admin)
  }
}

export { CreateCalculatorController }