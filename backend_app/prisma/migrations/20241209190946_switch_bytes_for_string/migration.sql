-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_temp_ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "file_path" TEXT NOT NULL
);
INSERT INTO "new_temp_ad" ("data", "file_path", "id") SELECT "data", "file_path", "id" FROM "temp_ad";
DROP TABLE "temp_ad";
ALTER TABLE "new_temp_ad" RENAME TO "temp_ad";
CREATE TABLE "new_temp_bit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT,
    "file_path" TEXT NOT NULL
);
INSERT INTO "new_temp_bit" ("data", "file_path", "id") SELECT "data", "file_path", "id" FROM "temp_bit";
DROP TABLE "temp_bit";
ALTER TABLE "new_temp_bit" RENAME TO "temp_bit";
CREATE TABLE "new_temp_dhcp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT,
    "file_path" TEXT NOT NULL
);
INSERT INTO "new_temp_dhcp" ("data", "file_path", "id") SELECT "data", "file_path", "id" FROM "temp_dhcp";
DROP TABLE "temp_dhcp";
ALTER TABLE "new_temp_dhcp" RENAME TO "temp_dhcp";
CREATE TABLE "new_temp_kace" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT,
    "file_path" TEXT NOT NULL
);
INSERT INTO "new_temp_kace" ("data", "file_path", "id") SELECT "data", "file_path", "id" FROM "temp_kace";
DROP TABLE "temp_kace";
ALTER TABLE "new_temp_kace" RENAME TO "temp_kace";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
