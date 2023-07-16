-- CreateTable
CREATE TABLE "book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "n_pages" INTEGER,
    "edition_year" DATETIME NOT NULL,
    "price" REAL,
    "id_location" INTEGER NOT NULL,
    "n_edition" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "book_code" TEXT NOT NULL,
    "caratula" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "book_id_location_fkey" FOREIGN KEY ("id_location") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Editorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book_editorial" (
    "book_id_editorial" INTEGER NOT NULL,
    "editorial_id" INTEGER NOT NULL,

    PRIMARY KEY ("book_id_editorial", "editorial_id"),
    CONSTRAINT "book_editorial_book_id_editorial_fkey" FOREIGN KEY ("book_id_editorial") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_editorial_editorial_id_fkey" FOREIGN KEY ("editorial_id") REFERENCES "Editorial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "nacionality" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book_author" (
    "book_id_author" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,

    PRIMARY KEY ("book_id_author", "author_id"),
    CONSTRAINT "book_author_book_id_author_fkey" FOREIGN KEY ("book_id_author") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "book_gender" (
    "book_id_gender" INTEGER NOT NULL,
    "gender_id" INTEGER NOT NULL,

    PRIMARY KEY ("book_id_gender", "gender_id"),
    CONSTRAINT "book_gender_book_id_gender_fkey" FOREIGN KEY ("book_id_gender") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "book_gender_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "gender" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shelf_number" TEXT NOT NULL
);

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

-- CreateTable
CREATE TABLE "aud_book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_book" TEXT NOT NULL,
    "code_book" TEXT NOT NULL,
    "edited_field" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "residence" TEXT,
    "phone_number" TEXT,
    "id_user" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "people_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_role" INTEGER NOT NULL,
    "id_state" INTEGER NOT NULL,
    CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "state" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "state" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "state" TEXT NOT NULL
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
    "id_people" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" DATETIME,
    "user_sesion" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    CONSTRAINT "lending_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lending_book" (
    "lending_id_book" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    PRIMARY KEY ("lending_id_book", "book_id"),
    CONSTRAINT "lending_book_lending_id_book_fkey" FOREIGN KEY ("lending_id_book") REFERENCES "lending" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lending_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "book_book_code_key" ON "book"("book_code");

-- CreateIndex
CREATE UNIQUE INDEX "location_shelf_number_key" ON "location"("shelf_number");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
