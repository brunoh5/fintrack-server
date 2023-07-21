/*
  Warnings:

  - You are about to drop the column `description` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `name` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopName` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "targetAmount" DECIMAL NOT NULL DEFAULT 0,
    "presentAmount" DECIMAL DEFAULT 0,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transactions" ("accountId", "amount", "createdAt", "id", "updatedAt", "userId") SELECT "accountId", "amount", "createdAt", "id", "updatedAt", "userId" FROM "Transactions";
DROP TABLE "Transactions";
ALTER TABLE "new_Transactions" RENAME TO "Transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
