import React from 'react'
import { Box, Stack, Typography } from "@mui/material";

export function OrderSumary() {
    return (
        <Box 
            sx={{ 
                width: '27%', 
                boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                borderRadius: '5px',
                padding: '2rem'
            }}
        >
            <Stack display="flex" flexDirection="column" gap={4}>
                <Typography fontWeight="bold">
                    Resumo do pedido
                </Typography>
                <Typography color="gray">
                    Subtotal
                    <span style={{ color:"black", fontWeight: "bold" }}> 0 </span>
                </Typography>
                <Typography color="gray">
                    Entrega do pedido
                    <span style={{ color:"black", fontWeight: "bold" }}> 0 </span>
                </Typography>
                <Typography color="gray">
                    Total
                    <span style={{ color:"black", fontWeight: "bold" }}> 0 </span>
                </Typography>
            </Stack>

            
            
            
        </Box>
    )
}