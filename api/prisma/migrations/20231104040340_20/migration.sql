/*
  Warnings:

  - Added the required column `amount` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `amount` INTEGER NOT NULL;
