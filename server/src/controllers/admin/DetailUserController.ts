import {Request, Response} from 'express'
import { DetailAdminService } from '../../services/admin/DetailAdminService'

class DetailAdminController{
  async handle(req: Request, res: Response){

    const admin_id = req.user_id;

    const detailUserService = new DetailAdminService();

    const admin = await detailUserService.execute(admin_id);

    return res.json(admin);

  }
}

export { DetailAdminController  }