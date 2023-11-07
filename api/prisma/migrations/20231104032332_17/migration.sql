/*
  Warnings:

  - You are about to drop the column `active` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `active`,
    ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;
