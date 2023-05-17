import { Request, Response } from "express";
import { ListUserService } from "../../services/admin/ListUserService";

class ListUserController{

    async handle(req:Request, res: Response){
        const userId = req.body;

        const listUserService = new ListUserService();

        const user = await listUserService.execute(
            userId
        );

        return res.json(user);
    }
}

export { ListUserController }