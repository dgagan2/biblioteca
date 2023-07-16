/*
  Warnings:

  - You are about to drop the `Editorial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_editorial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lending_book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `id_role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_state` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_people` on the `lending` table. All the data in the column will be lost.
  - You are about to drop the column `user_sesion` on the `lending` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `state` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `lending` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_session` to the `lending` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Editorial";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_author";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_editorial";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_gender";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "book_language";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "lending_book";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "people";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "editorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "city" TEXT
);

-- CreateTable
CREATE TABLE "profile" (
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "residence" TEXT,
    "phone_number" TEXT,
    "age" INTEGER,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "profile_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bookToeditorial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_bookToeditorial_A_fkey" FOREIGN KEY ("A") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bookToeditorial_B_fkey" FOREIGN KEY ("B") REFERENCES "editorial" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bookTogender" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_bookTogender_A_fkey" FOREIGN KEY ("A") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bookTogender_B_fkey" FOREIGN KEY ("B") REFERENCES "gender" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bookTolanguage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_bookTolanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bookTolanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_bookTolending" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_bookTolending_A_fkey" FOREIGN KEY ("A") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_bookTolending_B_fkey" FOREIGN KEY ("B") REFERENCES "lending" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_authorTobook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_authorTobook_A_fkey" FOREIGN KEY ("A") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_authorTobook_B_fkey" FOREIGN KEY ("B") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "state_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_state" ("id", "state") SELECT "id", "state" FROM "state";
DROP TABLE "state";
ALTER TABLE "new_state" RENAME TO "state";
CREATE UNIQUE INDEX "state_id_user_key" ON "state"("id_user");
CREATE TABLE "new_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "role_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_role" ("id", "role") SELECT "id", "role" FROM "role";
DROP TABLE "role";
ALTER TABLE "new_role" RENAME TO "role";
CREATE UNIQUE INDEX "role_id_user_key" ON "role"("id_user");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("email", "id", "password") SELECT "email", "id", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_lending" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" DATETIME,
    "user_session" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    CONSTRAINT "lending_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lending" ("createdAt", "id", "returnAt", "state") SELECT "createdAt", "id", "returnAt", "state" FROM "lending";
DROP TABLE "lending";
ALTER TABLE "new_lending" RENAME TO "lending";
CREATE TABLE "new_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "n_pages" INTEGER,
    "edition_year" TEXT,
    "price" REAL,
    "id_location" INTEGER NOT NULL,
    "n_edition" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "book_code" TEXT NOT NULL,
    "caratula" TEXT NOT NULL,
    CONSTRAINT "book_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_book" ("book_code", "caratula", "description", "edition_year", "id", "id_location", "n_edition", "n_pages", "name", "price", "stock") SELECT "book_code", "caratula", "description", "edition_year", "id", "id_location", "n_edition", "n_pages", "name", "price", "stock" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_book_code_key" ON "book"("book_code");
CREATE TABLE "new_author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "nacionality" TEXT,
    "profile_picture" TEXT
);
INSERT INTO "new_author" ("id", "nacionality", "name", "profile_picture", "surname") SELECT "id", "nacionality", "name", "profile_picture", "surname" FROM "author";
DROP TABLE "author";
ALTER TABLE "new_author" RENAME TO "author";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "profile_id_user_key" ON "profile"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "_bookToeditorial_AB_unique" ON "_bookToeditorial"("A", "B");

-- CreateIndex
CREATE INDEX "_bookToeditorial_B_index" ON "_bookToeditorial"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bookTogender_AB_unique" ON "_bookTogender"("A", "B");

-- CreateIndex
CREATE INDEX "_bookTogender_B_index" ON "_bookTogender"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bookTolanguage_AB_unique" ON "_bookTolanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_bookTolanguage_B_index" ON "_bookTolanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bookTolending_AB_unique" ON "_bookTolending"("A", "B");

-- CreateIndex
CREATE INDEX "_bookTolending_B_index" ON "_bookTolending"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_authorTobook_AB_unique" ON "_authorTobook"("A", "B");

-- CreateIndex
CREATE INDEX "_authorTobook_B_index" ON "_authorTobook"("B");
