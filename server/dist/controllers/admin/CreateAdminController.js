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

// src/controllers/admin/CreateAdminController.ts
var CreateAdminController_exports = {};
__export(CreateAdminController_exports, {
  CreateAdminController: () => CreateAdminController
});
module.exports = __toCommonJS(CreateAdminController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/CreateAdminService.ts
var import_bcryptjs = require("bcryptjs");
var CreateAdminService = class {
  async execute({ nome, email, senha }) {
    if (!email) {
      throw new Error("Email incorreto.");
    }
    const AdminAlreadyExists = await prisma_default.admin.findFirst({
      where: {
        email
      }
    });
    if (AdminAlreadyExists) {
      throw new Error("Usu\xE1rio existente.");
    }
    const passwordHash = await (0, import_bcryptjs.hash)(senha, 8);
    const admin = await prisma_default.admin.create({
      data: {
        nome,
        email,
        senha: passwordHash
      },
      select: {
        id: true,
        nome: true,
        email: true
      }
    });
    return admin;
  }
};

// src/controllers/admin/CreateAdminController.ts
var CreateAdminController = class {
  async handle(req, res) {
    const { nome, email, senha } = req.body;
    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute({
      nome,
      email,
      senha
    });
    return res.json(admin);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateAdminController
});
