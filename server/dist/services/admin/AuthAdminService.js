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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/services/admin/AuthAdminService.ts
var AuthAdminService_exports = {};
__export(AuthAdminService_exports, {
  AuthAdminService: () => AuthAdminService
});
module.exports = __toCommonJS(AuthAdminService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/AuthAdminService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var AuthAdminService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, senha }) {
      const admin = yield prisma_default.admin.findFirst({
        where: {
          email
        }
      });
      if (!admin) {
        throw new Error("Usu\xE1rio/senha incorreta");
      }
      const passwordMatch = yield (0, import_bcryptjs.compare)(senha, admin.senha);
      if (!passwordMatch) {
        throw new Error("Usu\xE1rio/senha incorreta");
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          nome: admin.nome,
          email: admin.email
        },
        process.env.JWT_SECRET,
        {
          subject: admin.id,
          expiresIn: "30d"
        }
      );
      return {
        id: admin.id,
        nome: admin.nome,
        email: admin.email,
        token
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthAdminService
});
