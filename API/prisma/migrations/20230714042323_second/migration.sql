/*
  Warnings:

  - You are about to drop the `book_languaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languaje` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_languaje";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "languaje";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book_language" (
    "book_id_language" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,

    PRIMARY KEY ("book_id_language", "language_id"),
    CONSTRAINT "book_language_book_id_language_fkey" FOREIGN KEY ("book_id_language") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_language_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
