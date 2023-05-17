import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/admin/CreateUserService'

class CreateUserController{
  async handle(req: Request, res: Response){
    const { nome, email, senha,comissao } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      nome,
      email,
      senha,
      comissao
    });

    return res.json(user)
  }
}

export { CreateUserController }