/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductImage` DROP FOREIGN KEY `ProductImage_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductStock` DROP FOREIGN KEY `ProductStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductStock` DROP FOREIGN KEY `ProductStock_stockUnitId_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupToPermission` DROP FOREIGN KEY `_GroupToPermission_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupToPermission` DROP FOREIGN KEY `_GroupToPermission_B_fkey`;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `Group`;

-- DropTable
DROP TABLE `Permission`;

-- DropTable
DROP TABLE `Product`;

-- DropTable
DROP TABLE `ProductImage`;

-- DropTable
DROP TABLE `ProductStock`;

-- DropTable
DROP TABLE `StockUnit`;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_address` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zip` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_group` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_group_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_permission` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('ADMIN', 'ESTOQUISTA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `ratings` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_stock` (
    `id` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `stockUnitId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_stock_unit` (
    `id` VARCHAR(191) NOT NULL,
    `unit` ENUM('UNIDADE', 'LITRO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_address` ADD CONSTRAINT `client_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `admin_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `product_stock_stockUnitId_fkey` FOREIGN KEY (`stockUnitId`) REFERENCES `product_stock_unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `product_stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToPermission` ADD CONSTRAINT `_GroupToPermission_A_fkey` FOREIGN KEY (`A`) REFERENCES `admin_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GroupToPermission` ADD CONSTRAINT `_GroupToPermission_B_fkey` FOREIGN KEY (`B`) REFERENCES `admin_permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
