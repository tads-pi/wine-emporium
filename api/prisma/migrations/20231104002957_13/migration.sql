/*
  Warnings:

  - You are about to drop the column `addressId` on the `checkout_address` table. All the data in the column will be lost.
  - You are about to drop the column `checkoutId` on the `checkout_address` table. All the data in the column will be lost.
  - You are about to drop the column `checkoutId` on the `checkout_deliverer` table. All the data in the column will be lost.
  - You are about to drop the column `delivererId` on the `checkout_deliverer` table. All the data in the column will be lost.
  - You are about to drop the column `checkoutId` on the `checkout_payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `checkout_payment` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivererId` to the `checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `checkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditCardId` to the `payment_credit_card_payment_method` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `checkout_address` DROP FOREIGN KEY `checkout_address_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout_address` DROP FOREIGN KEY `checkout_address_checkoutId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout_deliverer` DROP FOREIGN KEY `checkout_deliverer_checkoutId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout_deliverer` DROP FOREIGN KEY `checkout_deliverer_delivererId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout_payment` DROP FOREIGN KEY `checkout_payment_checkoutId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout_payment` DROP FOREIGN KEY `checkout_payment_paymentId_fkey`;

-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `checkout` ADD COLUMN `addressId` VARCHAR(191) NOT NULL,
    ADD COLUMN `delivererId` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `checkout_address` DROP COLUMN `addressId`,
    DROP COLUMN `checkoutId`;

-- AlterTable
ALTER TABLE `checkout_deliverer` DROP COLUMN `checkoutId`,
    DROP COLUMN `delivererId`;

-- AlterTable
ALTER TABLE `checkout_payment` DROP COLUMN `checkoutId`,
    DROP COLUMN `paymentId`;

-- AlterTable
ALTER TABLE `payment_credit_card_payment_method` ADD COLUMN `creditCardId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_AddressToCheckoutAddress` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddressToCheckoutAddress_AB_unique`(`A`, `B`),
    INDEX `_AddressToCheckoutAddress_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CheckoutDelivererToDeliverer` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CheckoutDelivererToDeliverer_AB_unique`(`A`, `B`),
    INDEX `_CheckoutDelivererToDeliverer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CheckoutPaymentToPayment` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CheckoutPaymentToPayment_AB_unique`(`A`, `B`),
    INDEX `_CheckoutPaymentToPayment_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `checkout_payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_delivererId_fkey` FOREIGN KEY (`delivererId`) REFERENCES `checkout_deliverer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `checkout_address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_credit_card_payment_method` ADD CONSTRAINT `payment_credit_card_payment_method_creditCardId_fkey` FOREIGN KEY (`creditCardId`) REFERENCES `credit_card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToCheckoutAddress` ADD CONSTRAINT `_AddressToCheckoutAddress_A_fkey` FOREIGN KEY (`A`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToCheckoutAddress` ADD CONSTRAINT `_AddressToCheckoutAddress_B_fkey` FOREIGN KEY (`B`) REFERENCES `checkout_address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CheckoutDelivererToDeliverer` ADD CONSTRAINT `_CheckoutDelivererToDeliverer_A_fkey` FOREIGN KEY (`A`) REFERENCES `checkout_deliverer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CheckoutDelivererToDeliverer` ADD CONSTRAINT `_CheckoutDelivererToDeliverer_B_fkey` FOREIGN KEY (`B`) REFERENCES `deliverer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CheckoutPaymentToPayment` ADD CONSTRAINT `_CheckoutPaymentToPayment_A_fkey` FOREIGN KEY (`A`) REFERENCES `checkout_payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CheckoutPaymentToPayment` ADD CONSTRAINT `_CheckoutPaymentToPayment_B_fkey` FOREIGN KEY (`B`) REFERENCES `payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
