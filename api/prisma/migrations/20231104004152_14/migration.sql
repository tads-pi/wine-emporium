/*
  Warnings:

  - You are about to drop the column `clientId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `cartItemsId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartItemsId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `backoffice_client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `checkout_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `checkout_deliverer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `checkout_payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `deliverer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payment_bank_slip_payment_method` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payment_credit_card_payment_method` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `cart_cartItemsId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_cartItemsId_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `clientId`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `backoffice_client_group` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `backoffice_client_group_permission` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `backoffice_client_permission` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `cartItemsId`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `checkout` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `checkout_address` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `checkout_deliverer` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `checkout_payment` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `client` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `client_address` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `client_credit_card` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `client_gender` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `credit_card` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `deliverer` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payment_bank_slip_payment_method` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payment_credit_card_payment_method` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payment_method` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `cartItemsId`;

-- AlterTable
ALTER TABLE `product_stock` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `backoffice_client_document_key` ON `backoffice_client`(`document`);

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
