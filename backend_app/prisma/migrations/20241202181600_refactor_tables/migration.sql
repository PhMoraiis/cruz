/*
  Warnings:

  - You are about to drop the column `nome` on the `report` table. All the data in the column will be lost.
  - Added the required column `name` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ad" BOOLEAN NOT NULL,
    "dhcp" BOOLEAN NOT NULL,
    "bit" BOOLEAN NOT NULL,
    "kace" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_report" ("ad", "bit", "dhcp", "id", "kace") SELECT "ad", "bit", "dhcp", "id", "kace" FROM "report";
DROP TABLE "report";
ALTER TABLE "new_report" RENAME TO "report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
