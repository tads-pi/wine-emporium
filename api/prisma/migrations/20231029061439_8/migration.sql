/*
  Warnings:

  - Added the required column `genderId` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `genderId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `client_gender` (
    `id` VARCHAR(191) NOT NULL,
    `firiendlyName` VARCHAR(191) NOT NULL,
    `name` ENUM('MASCULINO', 'FEMININO', 'NAO_BINARIO', 'GENERO_FLUIDO', 'OUTRO', 'PREFIRO_NAO_DIZER') NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `client_gender_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `client_gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
