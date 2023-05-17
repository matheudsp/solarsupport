import {Request, Response} from 'express'
import { DetailCalculatorService } from '../../services/user/DetailCalculatorService';

class DetailCalculatorController{
  async handle(req: Request, res: Response){

    const detailCalculatorService = new DetailCalculatorService();

    const info = await detailCalculatorService.execute();

    return res.json(info);

  }
}

export { DetailCalculatorController  }