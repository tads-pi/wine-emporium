/*
  Warnings:

  - The values [ADMIN] on the enum `admin_permission_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `admin_permission` MODIFY `name` ENUM('ADMINISTRADOR', 'ESTOQUISTA') NOT NULL;
