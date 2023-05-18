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

// src/services/admin/ListUsersService.ts
var ListUsersService_exports = {};
__export(ListUsersService_exports, {
  ListUsersService: () => ListUsersService
});
module.exports = __toCommonJS(ListUsersService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/ListUsersService.ts
var ListUsersService = class {
  async execute() {
    const findAll = await prisma_default.vendedor.findMany({
      select: {
        id: true,
        nome: true,
        comissao: true,
        email: true
      }
    });
    return findAll;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListUsersService
});
