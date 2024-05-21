/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `lastCharge` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HOME', 'FOOD', 'TRANSPORTATION', 'ENTERTAINMENT', 'SHOPPING', 'OTHERS');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_userId_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "bills" DROP COLUMN "imageUrl",
DROP COLUMN "lastCharge",
ADD COLUMN     "paid_amount" INTEGER,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL DEFAULT 'MONEY',
ALTER COLUMN "dueDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "categoryId",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'OTHERS',
ALTER COLUMN "transaction_type" SET DEFAULT 'DEBIT',
ALTER COLUMN "payment_method" SET DEFAULT 'MONEY';

-- DropTable
DROP TABLE "categories";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
