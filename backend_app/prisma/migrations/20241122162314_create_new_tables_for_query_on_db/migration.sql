/*
  Warnings:

  - You are about to drop the `Processed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Processed";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reports";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TempAD" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "TempDHCP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "TempBIT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "TempKACE" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "TempReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ad" BOOLEAN NOT NULL,
    "dhcp" BOOLEAN NOT NULL,
    "bit" BOOLEAN NOT NULL,
    "kace" BOOLEAN NOT NULL
);
