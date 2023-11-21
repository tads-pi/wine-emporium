import React from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { TableItemsCheckout } from '../TableItemsCheckout';

interface CartCheckoutProps {
    totalItems: number;
}


export function CartCheckout({ totalItems }: CartCheckoutProps) {
    return (
        <Box 
            sx={{ 
                width: '100%', 
                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                borderRadius: '5px',
                padding: '2rem'
            }}
        >
            <Stack display="flex" flexDirection="row">
                <Typography fontWeight="bold">
                    Itens no carinho
                    <span style={{ fontWeight: "normal" }}> ({totalItems} {totalItems > 1 ? 'Itens' : 'Item'}) </span>
                </Typography>
            </Stack>
            <TableItemsCheckout  />
        </Box>
    )
}