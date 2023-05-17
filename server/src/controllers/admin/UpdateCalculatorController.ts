import {Request, response, Response} from 'express'
import { UpdateCalculatorService } from '../../services/admin/UpdateCalculatorService';

class UpdateCalculatorController{
  async handle(req: Request, res: Response){
    const { potencia, id, faixaFinal,faixaInicial, valorCusto } = req.body;

    const updateCalculatorService = new UpdateCalculatorService();
    
    const update = await updateCalculatorService.execute({
      potencia,
      id,
      faixaInicial,
      faixaFinal,
      valorCusto
    });

    return res.json(update)
  }
}

export { UpdateCalculatorController }