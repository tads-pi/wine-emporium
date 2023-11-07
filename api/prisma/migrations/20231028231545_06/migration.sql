-- DropForeignKey
ALTER TABLE `backoffice_client` DROP FOREIGN KEY `backoffice_client_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `backoffice_client_group_permission` DROP FOREIGN KEY `backoffice_client_group_permission_backofficeGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `backoffice_client_group_permission` DROP FOREIGN KEY `backoffice_client_group_permission_backofficePermissionId_fkey`;

-- DropForeignKey
ALTER TABLE `client_address` DROP FOREIGN KEY `client_address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `product_image` DROP FOREIGN KEY `product_image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_stock` DROP FOREIGN KEY `product_stock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_stock` DROP FOREIGN KEY `product_stock_stockUnitId_fkey`;

-- AddForeignKey
ALTER TABLE `client_address` ADD CONSTRAINT `client_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client` ADD CONSTRAINT `backoffice_client_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `backoffice_client_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_backofficeGroupId_fkey` FOREIGN KEY (`backofficeGroupId`) REFERENCES `backoffice_client_group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `backoffice_client_group_permission` ADD CONSTRAINT `backoffice_client_group_permission_backofficePermissionId_fkey` FOREIGN KEY (`backofficePermissionId`) REFERENCES `backoffice_client_permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_image` ADD CONSTRAINT `product_image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `product_stock_stockUnitId_fkey` FOREIGN KEY (`stockUnitId`) REFERENCES `product_stock_unit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_stock` ADD CONSTRAINT `product_stock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
