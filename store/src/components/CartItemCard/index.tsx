import { CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import React from 'react'
import { enqueueSnackbar, VariantType } from 'notistack'

interface CartItemCardProps {
    data: any
    removeCart: () => void
}

// {
//     "name": "Wine Bottle Teste",
//     "description": "A bottle of red wine",
//     "price": "19.99",
//     "images": [],
//     "ratings": 0,
//     "totalRatings": 0
// }

export function CartItemCard({ data }: CartItemCardProps) {

    const handleClickVariant = (variant: VariantType) => () => {
        // variant could be success, error, warning, info, or default
        addCart()
        enqueueSnackbar(<Typography>Vinho removido do carrinho.</Typography>, { variant });
      };  


    return (
        <div style={{ width: '500px', border: 'solid black 1px', padding: '10px 15px', margin: '10px 15px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "center",
                }}>

                    <CardMedia
                        component="img"
                        height="100"
                        width="100"
                        image={data.images[0]}
                        alt="Vinho Wine Emporium"
                        style={{ objectFit: 'contain', borderRadius:"10px"}}
                    
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "center",
                        marginLeft:"10px"
                    }} >
                    <Typography style={{ whiteSpace: 'nowrap' }}>Vinho: {data.name}</Typography>
                    <Typography style={{ whiteSpace: 'nowrap' }}>Valor {data.price}</Typography>
                    </div>

                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color='error'>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}