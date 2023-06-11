var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/admin/DeleteUserController.ts
var DeleteUserController_exports = {};
__export(DeleteUserController_exports, {
  DeleteUserController: () => DeleteUserController
});
module.exports = __toCommonJS(DeleteUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/DeleteUserService.ts
var DeleteUserService = class {
  async execute({ id }) {
    const user = await prisma_default.vendedor.delete({
      where: {
        id
      },
      select: {
        nome: false,
        email: false,
        comissao: false,
        senha: false,
        id: true
      }
    });
    return user;
  }
};

// src/controllers/admin/DeleteUserController.ts
var DeleteUserController = class {
  async handle(req, res) {
    const { id } = req.body;
    const deleteUser = new DeleteUserService();
    const user = await deleteUser.execute({
      id
    });
    return res.json(user);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteUserController
});
