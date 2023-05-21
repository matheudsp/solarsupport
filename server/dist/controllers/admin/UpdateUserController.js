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

// src/controllers/admin/UpdateUserController.ts
var UpdateUserController_exports = {};
__export(UpdateUserController_exports, {
  UpdateUsersController: () => UpdateUsersController
});
module.exports = __toCommonJS(UpdateUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/admin/UpdateUserService.ts
var import_bcryptjs = require("bcryptjs");
var UpdateUsersService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ userId, nome, email, senha, comissao }) {
      if (senha) {
        senha = yield (0, import_bcryptjs.hash)(senha, 8);
      }
      const users = yield prisma_default.vendedor.update({
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
    });
  }
};

// src/controllers/admin/UpdateUserController.ts
var UpdateUsersController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { userId, nome, email, comissao, senha } = req.body;
      const updateUsers = new UpdateUsersService();
      const users = yield updateUsers.execute({
        userId,
        nome,
        email,
        comissao,
        senha
      });
      return res.json(users);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUsersController
});
