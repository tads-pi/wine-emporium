/*
  Warnings:

  - You are about to drop the column `active` on the `checkout` table. All the data in the column will be lost.
  - You are about to drop the `_AddressToCheckoutAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CheckoutDelivererToDeliverer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CheckoutPaymentToPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkout_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkout_deliverer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `checkout_payment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[document]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `checkout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AddressToCheckoutAddress` DROP FOREIGN KEY `_AddressToCheckoutAddress_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AddressToCheckoutAddress` DROP FOREIGN KEY `_AddressToCheckoutAddress_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CheckoutDelivererToDeliverer` DROP FOREIGN KEY `_CheckoutDelivererToDeliverer_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CheckoutDelivererToDeliverer` DROP FOREIGN KEY `_CheckoutDelivererToDeliverer_B_fkey`;

-- DropForeignKey
ALTER TABLE `_CheckoutPaymentToPayment` DROP FOREIGN KEY `_CheckoutPaymentToPayment_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CheckoutPaymentToPayment` DROP FOREIGN KEY `_CheckoutPaymentToPayment_B_fkey`;

-- DropForeignKey
ALTER TABLE `checkout` DROP FOREIGN KEY `checkout_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout` DROP FOREIGN KEY `checkout_delivererId_fkey`;

-- DropForeignKey
ALTER TABLE `checkout` DROP FOREIGN KEY `checkout_paymentId_fkey`;

-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `client_genderId_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `neighborhood` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `checkout` DROP COLUMN `active`,
    ADD COLUMN `deleteAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('ENDERECO_PENDENTE', 'ENTREGADOR_PENDENTE', 'METODO_DE_PAGAMENTO_PENDENTE', 'PAGAMENTO_PENDENTE', 'PAGAMENTO_CONFIRMADO', 'PAGAMENTO_RECUSADO', 'EM_PREPARACAO', 'EM_TRANSPORTE', 'ENTREGUE', 'CANCELADO') NOT NULL,
    MODIFY `addressId` VARCHAR(191) NULL,
    MODIFY `delivererId` VARCHAR(191) NULL,
    MODIFY `paymentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `client` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `birthDate` DATETIME(3) NULL,
    MODIFY `document` VARCHAR(191) NULL,
    MODIFY `genderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `credit_card` MODIFY `flag` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `markedImageID` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_AddressToCheckoutAddress`;

-- DropTable
DROP TABLE `_CheckoutDelivererToDeliverer`;

-- DropTable
DROP TABLE `_CheckoutPaymentToPayment`;

-- DropTable
DROP TABLE `checkout_address`;

-- DropTable
DROP TABLE `checkout_deliverer`;

-- DropTable
DROP TABLE `checkout_payment`;

-- CreateIndex
CREATE UNIQUE INDEX `client_document_key` ON `client`(`document`);

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `client_gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_delivererId_fkey` FOREIGN KEY (`delivererId`) REFERENCES `deliverer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checkout` ADD CONSTRAINT `checkout_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
