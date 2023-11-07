/*
  Warnings:

  - The values [PREFIRO_NAO_DIZER] on the enum `client_gender_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `client_gender` MODIFY `name` ENUM('MASCULINO', 'FEMININO', 'NAO_BINARIO', 'GENERO_FLUIDO', 'OUTRO', 'PREFIRO_NAO_INFORMAR') NOT NULL;
