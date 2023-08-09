-- CreateTable
CREATE TABLE "book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "nPages" INTEGER,
    "editionYear" TEXT,
    "price" REAL,
    "idLocation" INTEGER NOT NULL,
    "nEdition" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "bookCode" TEXT NOT NULL,
    "caratula" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "book_idLocation_fkey" FOREIGN KEY ("idLocation") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "editorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
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
    "profilePicture" TEXT,
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
    "shelfNumber" TEXT NOT NULL,
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
    "nameBook" TEXT NOT NULL,
    "codeBook" TEXT NOT NULL,
    "editedField" TEXT NOT NULL,
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
    "idRole" INTEGER NOT NULL DEFAULT 2,
    "idState" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "user_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_idState_fkey" FOREIGN KEY ("idState") REFERENCES "state" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "dateLogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateLogout" DATETIME
);

-- CreateTable
CREATE TABLE "lending" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" DATETIME,
    "userSession" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "book_bookCode_key" ON "book"("bookCode");

-- CreateIndex
CREATE UNIQUE INDEX "editorial_name_key" ON "editorial"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gender_gender_key" ON "gender"("gender");

-- CreateIndex
CREATE UNIQUE INDEX "location_shelfNumber_key" ON "location"("shelfNumber");

-- CreateIndex
CREATE UNIQUE INDEX "language_name_key" ON "language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "profile_idUser_key" ON "profile"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_key" ON "role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "state_state_key" ON "state"("state");

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
