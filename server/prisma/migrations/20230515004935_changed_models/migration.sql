/*
  Warnings:

  - The primary key for the `CustoPorKWH` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CustoPorKWH` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CustoPorKWH" DROP CONSTRAINT "CustoPorKWH_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CustoPorKWH_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PotenciaPlacas" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "PotenciaPlacas_id_seq";
