/*
  Warnings:

  - You are about to drop the `TempReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TempReport";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ad" BOOLEAN NOT NULL,
    "dhcp" BOOLEAN NOT NULL,
    "bit" BOOLEAN NOT NULL,
    "kace" BOOLEAN NOT NULL
);
