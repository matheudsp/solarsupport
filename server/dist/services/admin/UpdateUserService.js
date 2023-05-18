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

// src/services/admin/UpdateUserService.ts
var UpdateUserService_exports = {};
__export(UpdateUserService_exports, {
  UpdateUsersService: () => UpdateUsersService
});
module.exports = __toCommonJS(UpdateUserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/UpdateUserService.ts
var import_bcryptjs = require("bcryptjs");
var UpdateUsersService = class {
  async execute({ userId, nome, email, senha, comissao }) {
    if (senha) {
      senha = await (0, import_bcryptjs.hash)(senha, 8);
    }
    const users = await prisma_default.vendedor.update({
      where: {
        id: userId
      },
      data: {
        nome,
        senha,
        email,
        comissao
      }
    });
    return users;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUsersService
});
