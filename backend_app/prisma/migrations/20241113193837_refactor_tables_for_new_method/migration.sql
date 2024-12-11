/*
  Warnings:

  - You are about to drop the `ProcessedFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UploadedFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProcessedFiles";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UploadedFiles";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Processed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "file_content" BLOB NOT NULL,
    "file_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "file_content" BLOB NOT NULL,
    "report_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
