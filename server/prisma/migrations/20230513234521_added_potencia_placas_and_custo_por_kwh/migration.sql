-- CreateTable
CREATE TABLE "PotenciaPlacas" (
    "id" SERIAL NOT NULL,
    "potencia" INTEGER NOT NULL,

    CONSTRAINT "PotenciaPlacas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustoPorKWH" (
    "id" TEXT NOT NULL,
    "faixaInicial" INTEGER NOT NULL,
    "faixaFinal" INTEGER NOT NULL,
    "valorCusto" TEXT NOT NULL,

    CONSTRAINT "CustoPorKWH_pkey" PRIMARY KEY ("id")
);
