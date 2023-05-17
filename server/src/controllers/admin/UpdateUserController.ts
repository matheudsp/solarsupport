import {Request, Response} from 'express'
import { UpdateUsersService } from '../../services/admin/UpdateUserService';

class UpdateUsersController{
  async handle(req: Request, res: Response){
    const { userId, nome,email,comissao,senha} = req.body;

    const updateUsers = new UpdateUsersService();

    const users = await updateUsers.execute({
        userId, nome,email,comissao,senha
    });

    return res.json(users);

  }
}

export { UpdateUsersController }