/*
  Warnings:

  - You are about to drop the column `checkoutId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `flag` to the `credit_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_checkoutId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `checkoutId`;

-- AlterTable
ALTER TABLE `credit_card` ADD COLUMN `flag` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
