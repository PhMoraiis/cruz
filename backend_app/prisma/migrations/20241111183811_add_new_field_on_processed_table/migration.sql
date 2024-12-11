/*
  Warnings:

  - Added the required column `file_type` to the `ProcessedFiles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProcessedFiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "file_content" BLOB NOT NULL,
    "file_type" TEXT NOT NULL,
    "processes_content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_ProcessedFiles" ("created_at", "file_content", "filename", "id", "processes_content", "updated_at") SELECT "created_at", "file_content", "filename", "id", "processes_content", "updated_at" FROM "ProcessedFiles";
DROP TABLE "ProcessedFiles";
ALTER TABLE "new_ProcessedFiles" RENAME TO "ProcessedFiles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
