/*
  Warnings:

  - You are about to alter the column `balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `amount` on the `bills` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `targetAmount` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `presentAmount` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the column `paid_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `transaction_type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateEnum
CREATE TYPE "Period" AS ENUM ('ONLY', 'MONTHLY', 'ANUAL');

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "period" "Period" NOT NULL DEFAULT 'ONLY',
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "targetAmount" SET DEFAULT 0,
ALTER COLUMN "targetAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "presentAmount" SET DEFAULT 0,
ALTER COLUMN "presentAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "paid_at",
DROP COLUMN "type",
ADD COLUMN     "transaction_type" "TransactionType" NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;
