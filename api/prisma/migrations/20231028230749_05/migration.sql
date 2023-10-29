/*
  Warnings:

  - You are about to drop the column `groupId` on the `backoffice_client_group_permission` table. All the data in the column will be lost.
  - You are about to drop the column `permissionId` on the `backoffice_client_group_permission` table. All the data in the column will be lost.
  - Added the required column `backofficeGroupId` to the `backoffice_client_group_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backofficePermissionId` to the `backoffice_client_group_permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `backoffice_client_group_permission` DROP FOREIGN KEY `backoffice_client_group_permission_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `backoffice_client_group_permission` DROP FOREIGN KEY `backoffice_client_group_permission_permissionId_fkey`;

-- AlterTable
ALTER TABLE `backoffice_client_group_permission` DROP COLUMN `groupId`,
    DROP COLUMN `permissionId`,
    ADD COLUMN `backofficeGroupId` VARCHAR(191) NOT NULL,
    ADD COLUMN `backofficePermissionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_backofficeGroupId_fkey` FOREIGN KEY (`backofficeGroupId`) REFERENCES `backoffice_client_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_backofficePermissionId_fkey` FOREIGN KEY (`backofficePermissionId`) REFERENCES `backoffice_client_permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
