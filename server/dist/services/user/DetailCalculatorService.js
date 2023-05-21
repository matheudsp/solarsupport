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

// src/services/user/DetailCalculatorService.ts
var DetailCalculatorService_exports = {};
__export(DetailCalculatorService_exports, {
  DetailCalculatorService: () => DetailCalculatorService
});
module.exports = __toCommonJS(DetailCalculatorService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/DetailCalculatorService.ts
var DetailCalculatorService = class {
  execute() {
    return __async(this, null, function* () {
      const pot = yield prisma_default.potenciaPlacas.findMany({
        select: {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailCalculatorService
});
