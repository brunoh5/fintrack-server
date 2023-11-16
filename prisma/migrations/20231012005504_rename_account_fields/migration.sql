/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `Accounts` table. All the data in the column will be lost.
  - Added the required column `type` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "balance" DECIMAL NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "number" TEXT,
    "bank" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Accounts" ("balance", "bank", "createdAt", "id", "updatedAt", "userId") SELECT "balance", "bank", "createdAt", "id", "updatedAt", "userId" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
