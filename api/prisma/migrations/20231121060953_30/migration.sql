-- AlterTable
ALTER TABLE `address` ADD COLUMN `type` ENUM('SHIPPING', 'BILLING') NOT NULL DEFAULT 'SHIPPING';
