import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { TableItemsCheckout } from '../TableItemsCheckout';
import useCartCheckout from '../StepCheckout/useCartCheckout';



export function CartCheckout() {
    const {
        cartState,
        getCart,
        addProduct,
        removeProduct,
      } = useCartCheckout();
    
      useEffect(() => {
        getCart();
      }, [getCart, addProduct, removeProduct]);
    
      const handleAddProduct = (productId: string) => {
        addProduct(productId);
        getCart(); // Atualiza o carrinho após adicionar produto
      };
    
      const handleRemoveProduct = (productId: string) => {
        removeProduct(productId);
        getCart(); // Atualiza o carrinho após remover produto
      };

    const price = useMemo(() => {
        return cartState?.price
    }, [cartState])

    useEffect(() => {
        getCart()
    }, [cartState, addProduct, removeProduct])

    return (
        <Box 
            sx={{ 
                width: '70%', 
                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                borderRadius: '5px',
                padding: '2rem'
            }}
        >
            <Stack display="flex" flexDirection="row">
                <Typography fontWeight="bold">
                    Itens no carinho
                    <span style={{ fontWeight: "normal" }}> ({cartState.products.length} {cartState.products.length > 1 ? 'Itens' : 'Item'}) </span>
                </Typography>
            </Stack>

            
            <TableItemsCheckout
                cart={cartState}
                onAddProduct={handleAddProduct}
                onRemoveProduct={handleRemoveProduct}
            />
            
        </Box>
    )
}