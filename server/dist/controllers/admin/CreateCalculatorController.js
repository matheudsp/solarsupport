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

// src/controllers/admin/CreateCalculatorController.ts
var CreateCalculatorController_exports = {};
__export(CreateCalculatorController_exports, {
  CreateCalculatorController: () => CreateCalculatorController
});
module.exports = __toCommonJS(CreateCalculatorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCalculatorController
});
