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

// src/controllers/admin/ListUsersController.ts
var ListUsersController_exports = {};
__export(ListUsersController_exports, {
  ListUsersController: () => ListUsersController
});
module.exports = __toCommonJS(ListUsersController_exports);

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

// src/controllers/admin/ListUsersController.ts
var ListUsersController = class {
  async handle(req, res) {
    const listUsersController = new ListUsersService();
    const users = await listUsersController.execute();
    return res.json(users);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListUsersController
});
