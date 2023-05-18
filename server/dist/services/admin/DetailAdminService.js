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

// src/services/admin/DetailAdminService.ts
var DetailAdminService_exports = {};
__export(DetailAdminService_exports, {
  DetailAdminService: () => DetailAdminService
});
module.exports = __toCommonJS(DetailAdminService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/DetailAdminService.ts
var DetailAdminService = class {
  async execute(user_id) {
    const findById = await prisma_default.admin.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        nome: true,
        email: true
      }
    });
    return findById;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailAdminService
});
