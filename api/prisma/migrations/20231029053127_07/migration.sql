-- AlterTable
ALTER TABLE `backoffice_client_permission` MODIFY `name` ENUM('LIST_USER', 'CREATE_USER', 'READ_USER', 'UPDATE_USER', 'DELETE_USER', 'TOGGLE_USER_ACTIVE', 'LIST_PRODUCT', 'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT', 'UPDATE_PRODUCT_NAME', 'UPDATE_PRODUCT_DESCRIPTION', 'UPDATE_PRODUCT_PRICE', 'UPDATE_PRODUCT_RATINGS', 'UPDATE_PRODUCT_STOCK', 'UPDATE_PRODUCT_STOCK_UNIT', 'DELETE_PRODUCT', 'CREATE_PRODUCT_IMAGE', 'DELETE_PRODUCT_IMAGE', 'MARK_PRODUCT_IMAGE', 'TOGGLE_PRODUCT_ACTIVE') NOT NULL;