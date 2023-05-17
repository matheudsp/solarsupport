import { Request, Response} from 'express';
import { ListUsersService } from '../../services/admin/ListUsersService';

class ListUsersController{
    
    async handle(req: Request, res: Response){
        
        const listUsersController = new ListUsersService();

        const users = await listUsersController.execute();
        
        return res.json(users);
    }
}

export { ListUsersController }