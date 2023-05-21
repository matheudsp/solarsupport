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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateCalculatorController
});
