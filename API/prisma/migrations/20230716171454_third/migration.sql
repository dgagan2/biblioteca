-- AlterTable
ALTER TABLE "lending" ADD COLUMN "deletedAd" DATETIME;
ALTER TABLE "lending" ADD COLUMN "updateAt" DATETIME;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "deletedAd" DATETIME;
ALTER TABLE "user" ADD COLUMN "updateAt" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "nacionality" TEXT,
    "profile_picture" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);
INSERT INTO "new_author" ("id", "nacionality", "name", "profile_picture", "surname") SELECT "id", "nacionality", "name", "profile_picture", "surname" FROM "author";
DROP TABLE "author";
ALTER TABLE "new_author" RENAME TO "author";
CREATE TABLE "new_gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);
INSERT INTO "new_gender" ("gender", "id") SELECT "gender", "id" FROM "gender";
DROP TABLE "gender";
ALTER TABLE "new_gender" RENAME TO "gender";
CREATE TABLE "new_editorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "city" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);
INSERT INTO "new_editorial" ("city", "id", "name", "phone_number") SELECT "city", "id", "name", "phone_number" FROM "editorial";
DROP TABLE "editorial";
ALTER TABLE "new_editorial" RENAME TO "editorial";
CREATE TABLE "new_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "role_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_role" ("id", "id_user", "role") SELECT "id", "id_user", "role" FROM "role";
DROP TABLE "role";
ALTER TABLE "new_role" RENAME TO "role";
CREATE UNIQUE INDEX "role_id_user_key" ON "role"("id_user");
CREATE TABLE "new_location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shelf_number" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);
INSERT INTO "new_location" ("id", "shelf_number") SELECT "id", "shelf_number" FROM "location";
DROP TABLE "location";
ALTER TABLE "new_location" RENAME TO "location";
CREATE UNIQUE INDEX "location_shelf_number_key" ON "location"("shelf_number");
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "book_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_book" ("book_code", "caratula", "description", "edition_year", "id", "id_location", "n_edition", "n_pages", "name", "price", "stock") SELECT "book_code", "caratula", "description", "edition_year", "id", "id_location", "n_edition", "n_pages", "name", "price", "stock" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE UNIQUE INDEX "book_book_code_key" ON "book"("book_code");
CREATE TABLE "new_language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME
);
INSERT INTO "new_language" ("id", "name") SELECT "id", "name" FROM "language";
DROP TABLE "language";
ALTER TABLE "new_language" RENAME TO "language";
CREATE TABLE "new_profile" (
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "residence" TEXT,
    "phone_number" TEXT,
    "age" INTEGER,
    "id_user" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "profile_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_profile" ("age", "id_user", "name", "phone_number", "residence", "surname") SELECT "age", "id_user", "name", "phone_number", "residence", "surname" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile_id_user_key" ON "profile"("id_user");
CREATE TABLE "new_state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME,
    "deletedAd" DATETIME,
    CONSTRAINT "state_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_state" ("id", "id_user", "state") SELECT "id", "id_user", "state" FROM "state";
DROP TABLE "state";
ALTER TABLE "new_state" RENAME TO "state";
CREATE UNIQUE INDEX "state_id_user_key" ON "state"("id_user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
