/*
  Warnings:

  - Added the required column `sequentialId` to the `checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checkout` ADD COLUMN `sequentialId` INTEGER NOT NULL;
