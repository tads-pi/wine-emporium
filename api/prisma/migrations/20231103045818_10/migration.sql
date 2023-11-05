/*
  Warnings:

  - You are about to drop the column `stockUnitId` on the `product_stock` table. All the data in the column will be lost.
  - You are about to drop the `product_stock_unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit` to the `product_stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_stock` DROP FOREIGN KEY `product_stock_stockUnitId_fkey`;

-- AlterTable
ALTER TABLE `product_stock` DROP COLUMN `stockUnitId`,
    ADD COLUMN `unit` ENUM('UNIDADE', 'LITRO') NOT NULL;

-- DropTable
DROP TABLE `product_stock_unit`;
