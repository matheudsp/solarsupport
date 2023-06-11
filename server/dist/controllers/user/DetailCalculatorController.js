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

// src/controllers/user/DetailCalculatorController.ts
var DetailCalculatorController_exports = {};
__export(DetailCalculatorController_exports, {
  DetailCalculatorController: () => DetailCalculatorController
});
module.exports = __toCommonJS(DetailCalculatorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailCalculatorController
});
