/*
  Warnings:

  - You are about to drop the `_GroupToPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_GroupToPermission` DROP FOREIGN KEY `_GroupToPermission_A_fkey`;

-- DropForeignKey
ALTER TABLE `_GroupToPermission` DROP FOREIGN KEY `_GroupToPermission_B_fkey`;

-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `admin_groupId_fkey`;

-- DropTable
DROP TABLE `_GroupToPermission`;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `admin_group`;

-- DropTable
DROP TABLE `admin_permission`;

-- CreateTable
CREATE TABLE `backoffice_client` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `backoffice_client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backoffice_client_group` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('ADMINISTRADOR', 'ESTOQUISTA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `backoffice_client_group_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backoffice_client_group_permission` (
    `id` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backoffice_client_permission` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('LIST_USER', 'CREATE_USER', 'READ_USER', 'UPDATE_USER', 'DELETE_USER', 'TOGGLE_USER_ACTIVE', 'LIST_PRODUCT', 'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT', 'DELETE_PRODUCT', 'CREATE_PRODUCT_IMAGE', 'DELETE_PRODUCT_IMAGE', 'MARK_PRODUCT_IMAGE', 'TOGGLE_PRODUCT_ACTIVE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `backoffice_client_permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `backoffice_client` ADD CONSTRAINT `backoffice_client_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `backoffice_client_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `backoffice_client_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `backoffice_client_permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
