/*
  Warnings:

  - Added the required column `full_name` to the `credit_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `credit_card` ADD COLUMN `full_name` VARCHAR(191) NOT NULL;
