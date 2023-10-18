import { CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import React from 'react'
import { enqueueSnackbar } from 'notistack'

export function CartItemCard({ data, removeCart }) {

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        removeCart()
        enqueueSnackbar(<Typography>Vinho removido do carrinho.</Typography>, { variant })
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
                        image={data?.images[0]}
                        alt="Vinho Wine Emporium"
                        style={{ objectFit: 'contain', borderRadius: "10px" }}

                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: "10px"
                    }} >
                        <Typography style={{ whiteSpace: 'nowrap' }}>Vinho: {data?.name}</Typography>
                        <Typography style={{ whiteSpace: 'nowrap' }}>Valor {data?.price}</Typography>
                    </div>

                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color='error'>
                        <DeleteIcon fontSize="small" onClick={handleClickVariant('info')} />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}