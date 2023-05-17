import {Request, response, Response} from 'express'
import { CreateAdminService } from '../../services/admin/CreateAdminService'

class CreateAdminController{
  async handle(req: Request, res: Response){
    const { nome, email, senha } = req.body;

    const createAdminService = new CreateAdminService();

    const admin = await createAdminService.execute({
      nome,
      email,
      senha
    });

    return res.json(admin)
  }
}

export { CreateAdminController }