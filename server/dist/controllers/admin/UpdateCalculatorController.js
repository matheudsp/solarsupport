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

// src/controllers/admin/UpdateCalculatorController.ts
var UpdateCalculatorController_exports = {};
__export(UpdateCalculatorController_exports, {
  UpdateCalculatorController: () => UpdateCalculatorController
});
module.exports = __toCommonJS(UpdateCalculatorController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateCalculatorController
});
