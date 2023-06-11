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
  async execute({ email, senha }) {
    const user = await prisma_default.vendedor.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("Usu\xE1rio/senha incorreta");
    }
    const passwordMatch = await (0, import_bcryptjs.compare)(senha, user.senha);
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
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  async handle(req, res) {
    const { email, senha } = req.body;
    const authUserService = new AuthUserService();
    const auth = await authUserService.execute({
      email,
      senha
    });
    return res.json(auth);
  }
};

// src/services/admin/AuthAdminService.ts
var import_bcryptjs2 = require("bcryptjs");
var import_jsonwebtoken3 = require("jsonwebtoken");
var AuthAdminService = class {
  async execute({ email, senha }) {
    const admin = await prisma_default.admin.findFirst({
      where: {
        email
      }
    });
    if (!admin) {
      throw new Error("Usu\xE1rio/senha incorreta");
    }
    const passwordMatch = await (0, import_bcryptjs2.compare)(senha, admin.senha);
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
  }
};

// src/controllers/admin/AuthAdminController.ts
var AuthAdminController = class {
  async handle(req, res) {
    const { email, senha } = req.body;
    const authAdminService = new AuthAdminService();
    const auth = await authAdminService.execute({
      email,
      senha
    });
    return res.json(auth);
  }
};

// src/services/admin/CreateUserService.ts
var import_bcryptjs3 = require("bcryptjs");
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
    const passwordHash = await (0, import_bcryptjs3.hash)(senha, 8);
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

// src/controllers/admin/CreateUserController.ts
var CreateUserController = class {
  async handle(req, res) {
    const { nome, email, senha, comissao } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      nome,
      email,
      senha,
      comissao
    });
    return res.json(user);
  }
};

// src/services/admin/CreateAdminService.ts
var import_bcryptjs4 = require("bcryptjs");
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
    const passwordHash = await (0, import_bcryptjs4.hash)(senha, 8);
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

// src/services/admin/UpdateUserService.ts
var import_bcryptjs5 = require("bcryptjs");
var UpdateUsersService = class {
  async execute({ userId, nome, email, senha, comissao }) {
    if (senha) {
      senha = await (0, import_bcryptjs5.hash)(senha, 8);
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

// src/controllers/admin/UpdateUserController.ts
var UpdateUsersController = class {
  async handle(req, res) {
    const { userId, nome, email, comissao, senha } = req.body;
    const updateUsers = new UpdateUsersService();
    const users = await updateUsers.execute({
      userId,
      nome,
      email,
      comissao,
      senha
    });
    return res.json(users);
  }
};

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

// src/services/admin/ListUserService.ts
var ListUserService = class {
  async execute({ userId }) {
    const findById = await prisma_default.vendedor.findMany({
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
  }
};

// src/controllers/admin/ListUserController.ts
var ListUserController = class {
  async handle(req, res) {
    const userId = req.body;
    const listUserService = new ListUserService();
    const user = await listUserService.execute(
      userId
    );
    return res.json(user);
  }
};

// src/services/user/DetailUserService.ts
var DetailUserService = class {
  async execute(user_id) {
    const user = await prisma_default.vendedor.findFirst({
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
  }
};

// src/controllers/user/DetailUserController.ts
var DetailUserController = class {
  async handle(req, res) {
    const user_id = req.user_id;
    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(user_id);
    return res.json(user);
  }
};

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

// src/controllers/admin/DetailUserController.ts
var DetailAdminController = class {
  async handle(req, res) {
    const admin_id = req.user_id;
    const detailUserService = new DetailAdminService();
    const admin = await detailUserService.execute(admin_id);
    return res.json(admin);
  }
};

// src/services/user/DetailCalculatorService.ts
var DetailCalculatorService = class {
  async execute() {
    const pot = await prisma_default.potenciaPlacas.findMany({
      select: {
        potencia: true
      }
    });
    const custo = await prisma_default.custoPorKWH.findMany({
      select: {
        id: true,
        valorCusto: true,
        faixaInicial: true,
        faixaFinal: true
      }
    });
    return { pot, custo };
  }
};

// src/controllers/user/DetailCalculatorController.ts
var DetailCalculatorController = class {
  async handle(req, res) {
    const detailCalculatorService = new DetailCalculatorService();
    const info = await detailCalculatorService.execute();
    return res.json(info);
  }
};

// src/services/admin/CreateCalculatorService.ts
var CreateCalculatorService = class {
  async execute({ faixaInicial, faixaFinal, valorCusto, potencia }) {
    if (potencia) {
      const pot = await prisma_default.potenciaPlacas.create({
        data: {
          potencia
        }
      });
      return pot;
    } else {
      const info = await prisma_default.custoPorKWH.create({
        data: {
          faixaInicial,
          faixaFinal,
          valorCusto
        }
      });
      return info;
    }
  }
};

// src/controllers/admin/CreateCalculatorController.ts
var CreateCalculatorController = class {
  async handle(req, res) {
    const { potencia, faixaFinal, faixaInicial, valorCusto } = req.body;
    const createCalculatorService = new CreateCalculatorService();
    const admin = await createCalculatorService.execute({
      potencia,
      faixaInicial,
      faixaFinal,
      valorCusto
    });
    return res.json(admin);
  }
};

// src/services/admin/UpdateCalculatorService.ts
var UpdateCalculatorService = class {
  async execute({ potencia, id, faixaInicial, faixaFinal, valorCusto }) {
    if (potencia) {
      const pot = await prisma_default.potenciaPlacas.update({
        where: {
          id: 1
        },
        data: {
          potencia
        }
      });
      return pot;
    } else {
      const custo = await prisma_default.custoPorKWH.update({
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
  }
};

// src/controllers/admin/UpdateCalculatorController.ts
var UpdateCalculatorController = class {
  async handle(req, res) {
    const { potencia, id, faixaFinal, faixaInicial, valorCusto } = req.body;
    const updateCalculatorService = new UpdateCalculatorService();
    const update = await updateCalculatorService.execute({
      potencia,
      id,
      faixaInicial,
      faixaFinal,
      valorCusto
    });
    return res.json(update);
  }
};

// src/controllers/admin/GenerateProposalController.ts
var import_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));

// src/services/admin/GenerateProposalService.ts
var import_yumdocs = require("@yumdocs/yumdocs");
var import_node_path = __toESM(require("path"));
var import_convertapi = __toESM(require("convertapi"));
var INPUT = "template/template.docx";
var OUTPUT_DOCX = "cache/proposta.docx";
var OUTPUT_PDF = "cache/proposta.pdf";
var GenerateProposalService = class {
  async execute({ cliente, clienteId, clienteEmail, mediaConsumo, potenciaProjeto, vendedor, precoTotal }) {
    try {
      const t = new import_yumdocs.YumTemplate();
      const i = import_node_path.default.resolve(process.cwd(), INPUT);
      const outputDocx = import_node_path.default.resolve(process.cwd(), OUTPUT_DOCX);
      await t.load(i);
      const dataAtual = /* @__PURE__ */ new Date();
      const dia = dataAtual.getDate();
      const mes = dataAtual.getMonth() + 1;
      const ano = dataAtual.getFullYear();
      await t.render({
        cliente,
        clienteId,
        email: clienteEmail,
        mediaConsumo,
        potenciaProjeto,
        data: `${dia}/${mes}/${ano}`,
        vendedor,
        precoTotal
      });
      await t.saveAs(outputDocx);
      const convertapi = new import_convertapi.default("iLRaEC899dUflho3", { conversionTimeout: 60 });
      await convertapi.convert("pdf", { File: "cache/proposta.docx" }).then(function(result) {
        return result.file.save("cache/proposta.pdf");
      }).catch(function(e) {
        return e.toString();
      });
    } catch (e) {
      return e;
    }
    return OUTPUT_PDF;
  }
};

// src/controllers/admin/GenerateProposalController.ts
var GenerateProposalController = class {
  async handle(req, res) {
    const inputDocx = import_node_path2.default.resolve(process.cwd(), OUTPUT_DOCX);
    if (import_fs.default.existsSync(inputDocx)) {
      import_fs.default.unlink(inputDocx, (e) => {
        if (e) {
          return res.json(e);
        }
      });
    }
    const {
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    } = req.body;
    const generateProposal = new GenerateProposalService();
    const pdf = await generateProposal.execute({
      cliente,
      clienteId,
      clienteEmail,
      mediaConsumo,
      potenciaProjeto,
      vendedor,
      precoTotal
    });
    return res.download(pdf);
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
router.post("/acessar", new AuthUserController().handle);
router.get("/perfil", isAuth, new DetailUserController().handle);
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
router.get("/admin/gerar-proposta/manutencao", isAuth, new GenerateProposalController().handle);
router.get("/calculadora", isAuth, new DetailCalculatorController().handle);

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
