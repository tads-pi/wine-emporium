/*
  Warnings:

  - You are about to drop the `product_image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `markedImageID` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `markedImageID` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `product_image`;
