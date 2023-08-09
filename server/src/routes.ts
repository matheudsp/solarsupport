import { Router } from 'express';

import { isAuth } from './middlewares/isAuth';
import { AuthUserController } from './controllers/user/AuthUserController';
import { AuthAdminController } from './controllers/admin/AuthAdminController';
import { CreateUserController } from './controllers/admin/CreateUserController'
import { CreateAdminController } from './controllers/admin/CreateAdminController';
import { ListUsersController } from './controllers/admin/ListUsersController';
import { UpdateUsersController } from './controllers/admin/UpdateUserController';
import { DeleteUserController } from './controllers/admin/DeleteUserController';
import { ListUserController } from './controllers/admin/ListUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { DetailAdminController } from './controllers/admin/DetailUserController';
import { DetailCalculatorController } from './controllers/user/DetailCalculatorController';
import { CreateCalculatorController } from './controllers/admin/CreateCalculatorController';
import { UpdateCalculatorController } from './controllers/admin/UpdateCalculatorController';
import { GenerateMaintenanceProposalController } from './controllers/admin/GenerateMaintenanceProposalController';
import { GenerateServiceProposalController } from './controllers/admin/GenerateServiceProposalController';
import { ListUsersNameController } from './controllers/admin/ListUsersNameController';
import { ConvertToPdfServiceController } from './utils/ConvertToPDFService';
import { ConvertToPdfMaintenceController } from './utils/ConvertToPDFMaintence';



const router = Router();

//-- ROTAS USER --
router.post('/acessar', new AuthUserController().handle)

router.get('/perfil', isAuth, new DetailUserController().handle)

//-- ROTAS ADMIN --
router.post('/admin', new AuthAdminController().handle)

router.post('/admin/criarAdmin', new CreateAdminController().handle)

router.post('/admin/criarUsuario',isAuth, new CreateUserController().handle)

router.get('/admin/usuarios', isAuth, new ListUsersController().handle)

router.get('/admin/usuarios/nome', isAuth, new ListUsersNameController().handle)

router.post('/admin/usuario', isAuth, new ListUserController().handle)

router.put('/admin/alterar', isAuth, new UpdateUsersController().handle)

router.delete('/admin/excluir', isAuth, new DeleteUserController().handle)

router.get('/admin/perfil', isAuth, new DetailAdminController().handle)

router.post('/admin/calculadora', isAuth, new CreateCalculatorController().handle)

router.put('/admin/calculadora', isAuth, new UpdateCalculatorController().handle)

router.post('/admin/gerar-proposta/manutencao', isAuth, new GenerateMaintenanceProposalController().handle)

router.post('/admin/gerar-proposta/servico', isAuth, new GenerateServiceProposalController().handle)

router.get('/admin/gerar-proposta/converter/manutencao', isAuth, new ConvertToPdfMaintenceController().handle)

router.get('/admin/gerar-proposta/converter/servico', isAuth, new ConvertToPdfServiceController().handle)

// -- Global routes --
router.get('/calculadora' , isAuth, new DetailCalculatorController().handle)


export { router }; 