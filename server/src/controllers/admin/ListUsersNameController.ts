import { Request, Response} from 'express';
import { ListUsersNameService } from '../../services/admin/ListUsersNameService';

class ListUsersNameController{
    
    async handle(req: Request, res: Response){
        
        const listUsersNameController = new ListUsersNameService();

        const name = await listUsersNameController.execute();
        
        return res.json(name);
    }
}

export { ListUsersNameController }