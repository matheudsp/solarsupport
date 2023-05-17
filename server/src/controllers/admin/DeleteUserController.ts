import {Request, Response} from 'express'
import { DeleteUserService } from '../../services/admin/DeleteUserService';

class DeleteUserController{
  async handle(req: Request, res: Response){
    const { id } = req.body;

    const deleteUser = new DeleteUserService();

    const user  = await deleteUser.execute({
      id
    });

    return res.json(user);

  }
}

export { DeleteUserController }