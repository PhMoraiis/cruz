/*
  Warnings:

  - You are about to drop the column `created_at` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `report` table. All the data in the column will be lost.

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
    "kace" BOOLEAN NOT NULL
);
INSERT INTO "new_report" ("ad", "bit", "dhcp", "id", "kace", "name") SELECT "ad", "bit", "dhcp", "id", "kace", "name" FROM "report";
DROP TABLE "report";
ALTER TABLE "new_report" RENAME TO "report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
