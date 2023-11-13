/*
  Warnings:

  - Changed the type of `dueDate` on the `payment_bank_slip_payment_method` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `payment_bank_slip_payment_method` DROP COLUMN `dueDate`,
    ADD COLUMN `dueDate` INTEGER NOT NULL;
