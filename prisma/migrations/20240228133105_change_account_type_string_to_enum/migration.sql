/*
  Warnings:

  - The `type` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CURRENT_ACCOUNT', 'INVESTMENT_ACCOUNT', 'SAVINGS_ACCOUNT', 'MACHINE_ACCOUNT');

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "type",
ADD COLUMN "type" "AccountType" NOT NULL DEFAULT 'CURRENT_ACCOUNT';
