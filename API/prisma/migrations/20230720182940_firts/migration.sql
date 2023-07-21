-- CreateTable
CREATE TABLE "book" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "book_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "editorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "city" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "nacionality" TEXT,
    "profile_picture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shelf_number" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "aud_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_book" TEXT NOT NULL,
    "code_book" TEXT NOT NULL,
    "edited_field" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "profile" (
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "residence" TEXT,
    "phoneNumber" TEXT,
    "age" INTEGER,
    "idUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "profile_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_role" INTEGER NOT NULL DEFAULT 2,
    "id_state" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "state" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);

-- CreateTable
CREATE TABLE "aud_login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "date_login" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_logout" DATETIME
);

-- CreateTable
CREATE TABLE "lending" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" DATETIME,
    "user_session" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "lending_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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

-- CreateIndex
CREATE UNIQUE INDEX "book_book_code_key" ON "book"("book_code");

-- CreateIndex
CREATE UNIQUE INDEX "location_shelf_number_key" ON "location"("shelf_number");

-- CreateIndex
CREATE UNIQUE INDEX "profile_idUser_key" ON "profile"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

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
