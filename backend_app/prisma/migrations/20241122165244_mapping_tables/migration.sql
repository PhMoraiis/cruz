/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TempAD` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TempBIT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TempDHCP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TempKACE` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Report";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TempAD";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TempBIT";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TempDHCP";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TempKACE";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "temp_ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "temp_dhcp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "temp_bit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "temp_kace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "ad" BOOLEAN NOT NULL,
    "dhcp" BOOLEAN NOT NULL,
    "bit" BOOLEAN NOT NULL,
    "kace" BOOLEAN NOT NULL
);
