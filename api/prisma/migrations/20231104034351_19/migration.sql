/*
  Warnings:

  - Added the required column `status` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `status` ENUM('OPEN', 'DELETED', 'DONE') NOT NULL;
