var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = require("express");

// src/middlewares/isAuth.ts
var import_jsonwebtoken = require("jsonwebtoken");
function isAuth(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken.verify)(
      token,
      process.env.JWT_SECRET
    );
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/AuthUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken2 = require("jsonwebtoken");
var AuthUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, senha }) {
      const user = yield prisma_default.vendedor.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        throw new Error("Usu\xE1rio/senha incorreta");
      }
      const passwordMatch = yield (0, import_bcryptjs.compare)(senha, user.senha);
      if (!passwordMatch) {
        throw new Error("Usu\xE1rio/senha incorreta");
      }
      const token = (0, import_jsonwebtoken2.sign)(
        {
          nome: user.nome,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: "30d"
        }
      );
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        comissao: user.comissao,
        token
      };
    });
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { email, senha } = req.body;
      const authUserService = new AuthUserService();
      const auth = yield authUserService.execute({
        email,
        senha
      });
      return res.json(auth);
    });
  }
};

// src/services/admin/AuthAdminService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken3 = require("jsonwebtoken");
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
      const passwordMatch = yield (0, import_bcryptjs2.compare)(senha, admin.senha);
      if (!passwordMatch) {
        throw new Error("Usu\xE1rio/senha incorreta");
      }
      const token = (0, import_jsonwebtoken3.sign)(
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

// src/controllers/admin/AuthAdminController.ts
var AuthAdminController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { email, senha } = req.body;
      const authAdminService = new AuthAdminService();
      const auth = yield authAdminService.execute({
        email,
        senha
      });
      return res.json(auth);
    });
  }
};

// src/services/admin/CreateUserService.ts
var import_bcryptjs3 = require("bcryptjs");
var CreateUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ nome, email, senha, comissao }) {
      if (!email) {
        throw new Error("Email incorreto.");
      }
      const userAlreadyExists = yield prisma_default.vendedor.findFirst({
        where: {
          email
        }
      });
      if (userAlreadyExists) {
        throw new Error("Usu\xE1rio existente.");
      }
      const passwordHash = yield (0, import_bcryptjs3.hash)(senha, 8);
      const user = yield prisma_default.vendedor.create({
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
    });
  }
};

// src/controllers/admin/CreateUserController.ts
var CreateUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { nome, email, senha, comissao } = req.body;
      const createUserService = new CreateUserService();
      const user = yield createUserService.execute({
        nome,
        email,
        senha,
        comissao
      });
      return res.json(user);
    });
  }
};

// src/services/admin/CreateAdminService.ts
var import_bcryptjs4 = require("bcryptjs");
var CreateAdminService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ nome, email, senha }) {
      if (!email) {
        throw new Error("Email incorreto.");
      }
      const AdminAlreadyExists = yield prisma_default.admin.findFirst({
        where: {
          email
        }
      });
      if (AdminAlreadyExists) {
        throw new Error("Usu\xE1rio existente.");
      }
      const passwordHash = yield (0, import_bcryptjs4.hash)(senha, 8);
      const admin = yield prisma_default.admin.create({
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
    });
  }
};

// src/controllers/admin/CreateAdminController.ts
var CreateAdminController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { nome, email, senha } = req.body;
      const createAdminService = new CreateAdminService();
      const admin = yield createAdminService.execute({
        nome,
        email,
        senha
      });
      return res.json(admin);
    });
  }
};

// src/services/admin/ListUsersService.ts
var ListUsersService = class {
  execute() {
    return __async(this, null, function* () {
      const findAll = yield prisma_default.vendedor.findMany({
        select: {
          id: true,
          nome: true,
          comissao: true,
          email: true
        }
      });
      return findAll;
    });
  }
};

// src/controllers/admin/ListUsersController.ts
var ListUsersController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const listUsersController = new ListUsersService();
      const users = yield listUsersController.execute();
      return res.json(users);
    });
  }
};

// src/services/admin/UpdateUserService.ts
var import_bcryptjs5 = require("bcryptjs");
var UpdateUsersService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ userId, nome, email, senha, comissao }) {
      if (senha) {
        senha = yield (0, import_bcryptjs5.hash)(senha, 8);
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

// src/services/admin/DeleteUserService.ts
var DeleteUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ id }) {
      const user = yield prisma_default.vendedor.delete({
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
    });
  }
};

// src/controllers/admin/DeleteUserController.ts
var DeleteUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { id } = req.body;
      const deleteUser = new DeleteUserService();
      const user = yield deleteUser.execute({
        id
      });
      return res.json(user);
    });
  }
};

// src/services/admin/ListUserService.ts
var ListUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ userId }) {
      const findById = yield prisma_default.vendedor.findMany({
        where: {
          id: userId
        },
        select: {
          id: true,
          nome: true,
          email: true,
          comissao: true
        }
      });
      return findById;
    });
  }
};

// src/controllers/admin/ListUserController.ts
var ListUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const userId = req.body;
      const listUserService = new ListUserService();
      const user = yield listUserService.execute(
        userId
      );
      return res.json(user);
    });
  }
};

// src/services/user/DetailUserService.ts
var DetailUserService = class {
  execute(user_id) {
    return __async(this, null, function* () {
      const user = yield prisma_default.vendedor.findFirst({
        where: {
          id: user_id
        },
        select: {
          id: true,
          nome: true,
          email: true,
          comissao: true
        }
      });
      return user;
    });
  }
};

// src/controllers/user/DetailUserController.ts
var DetailUserController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const user_id = req.user_id;
      const detailUserService = new DetailUserService();
      const user = yield detailUserService.execute(user_id);
      return res.json(user);
    });
  }
};

// src/services/admin/DetailAdminService.ts
var DetailAdminService = class {
  execute(user_id) {
    return __async(this, null, function* () {
      const findById = yield prisma_default.admin.findFirst({
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
    });
  }
};

// src/controllers/admin/DetailUserController.ts
var DetailAdminController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const admin_id = req.user_id;
      const detailUserService = new DetailAdminService();
      const admin = yield detailUserService.execute(admin_id);
      return res.json(admin);
    });
  }
};

// src/services/user/DetailCalculatorService.ts
var DetailCalculatorService = class {
  execute() {
    return __async(this, null, function* () {
      const pot = yield prisma_default.potenciaPlacas.findMany({
        select: {
          id: true,
          potencia: true
        }
      });
      const custo = yield prisma_default.custoPorKWH.findMany({
        select: {
          id: true,
          valorCusto: true,
          faixaInicial: true,
          faixaFinal: true
        }
      });
      return { pot, custo };
    });
  }
};

// src/controllers/user/DetailCalculatorController.ts
var DetailCalculatorController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const detailCalculatorService = new DetailCalculatorService();
      const info = yield detailCalculatorService.execute();
      return res.json(info);
    });
  }
};

// src/services/admin/CreateCalculatorService.ts
var CreateCalculatorService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ faixaInicial, faixaFinal, valorCusto, potencia }) {
      if (potencia) {
        const pot = yield prisma_default.potenciaPlacas.create({
          data: {
            potencia
          }
        });
        return pot;
      } else {
        const info = yield prisma_default.custoPorKWH.create({
          data: {
            faixaInicial,
            faixaFinal,
            valorCusto
          }
        });
        return info;
      }
    });
  }
};

// src/controllers/admin/CreateCalculatorController.ts
var CreateCalculatorController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { potencia, faixaFinal, faixaInicial, valorCusto } = req.body;
      const createCalculatorService = new CreateCalculatorService();
      const admin = yield createCalculatorService.execute({
        potencia,
        faixaInicial,
        faixaFinal,
        valorCusto
      });
      return res.json(admin);
    });
  }
};

// src/services/admin/UpdateCalculatorService.ts
var UpdateCalculatorService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ potencia, id, faixaInicial, faixaFinal, valorCusto }) {
      if (potencia) {
        const pot = yield prisma_default.potenciaPlacas.update({
          where: {
            id: 1
          },
          data: {
            potencia
          }
        });
        return pot;
      } else {
        const custo = yield prisma_default.custoPorKWH.update({
          where: {
            id
          },
          data: {
            faixaInicial,
            faixaFinal,
            valorCusto
          }
        });
        return custo;
      }
    });
  }
};

// src/controllers/admin/UpdateCalculatorController.ts
var UpdateCalculatorController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      const { potencia, id, faixaFinal, faixaInicial, valorCusto } = req.body;
      const updateCalculatorService = new UpdateCalculatorService();
      const update = yield updateCalculatorService.execute({
        potencia,
        id,
        faixaInicial,
        faixaFinal,
        valorCusto
      });
      return res.json(update);
    });
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.post("/acessar", new AuthUserController().handle);
router.get("/perfil", isAuth, new DetailUserController().handle);
router.get("/calculadora", isAuth, new DetailCalculatorController().handle);
router.post("/admin", new AuthAdminController().handle);
router.post("/admin/criarAdmin", new CreateAdminController().handle);
router.post("/admin/criarUsuario", isAuth, new CreateUserController().handle);
router.get("/admin/usuarios", isAuth, new ListUsersController().handle);
router.post("/admin/usuario", isAuth, new ListUserController().handle);
router.put("/admin/alterar", isAuth, new UpdateUsersController().handle);
router.delete("/admin/excluir", isAuth, new DeleteUserController().handle);
router.get("/admin/perfil", isAuth, new DetailAdminController().handle);
router.post("/admin/calculadora", isAuth, new CreateCalculatorController().handle);
router.put("/admin/calculadora", isAuth, new UpdateCalculatorController().handle);

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error."
  });
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}, () => console.log("HTTP Server Running!"));
