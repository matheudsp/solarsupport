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

// src/services/admin/CreateUserService.ts
var CreateUserService_exports = {};
__export(CreateUserService_exports, {
  CreateUserService: () => CreateUserService
});
module.exports = __toCommonJS(CreateUserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/CreateUserService.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserService = class {
  async execute({ nome, email, senha, comissao }) {
    if (!email) {
      throw new Error("Email incorreto.");
    }
    const userAlreadyExists = await prisma_default.vendedor.findFirst({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throw new Error("Usu\xE1rio existente.");
    }
    const passwordHash = await (0, import_bcryptjs.hash)(senha, 8);
    const user = await prisma_default.vendedor.create({
      data: {
        nome,
        email,
        senha: passwordHash,
        comissao
      },
      select: {
        id: true,
        nome: true,
        email: true,
        comissao: true
      }
    });
    return user;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserService
});
