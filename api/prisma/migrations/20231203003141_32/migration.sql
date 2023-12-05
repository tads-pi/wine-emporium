/*
  Warnings:

  - You are about to drop the column `finishedAt` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `finishedAt`;

-- AlterTable
ALTER TABLE `checkout` ADD COLUMN `finishedAt` DATETIME(3) NULL;
