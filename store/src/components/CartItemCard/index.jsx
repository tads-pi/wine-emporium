import { CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import React from 'react'
import { enqueueSnackbar } from 'notistack'
import { formatCurrency } from '../../utils/formatCurrency';

export function CartItemCard({ data, removeCart }) {

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        removeCart()
        enqueueSnackbar(<Typography>Vinho removido do carrinho.</Typography>, { variant })
    };

    console.log('rapaize', data)

    return (
        <div style={{ 
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginBottom: '20px'
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '10px 15px',
                borderBottom: '1px solid #eee'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <CardMedia
                        component="img"
                        height="50"
                        width="50"
                        image={data?.images[0].url}
                        alt="Vinho Wine Emporium"
                        style={{ 
                            objectFit: 'contain', 
                            borderRadius: "8px",
                            marginRight: '10px'
                        }}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }} >
                        <Typography style={{ 
                            whiteSpace: 'nowrap',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginBottom: '5px'
                        }}>Vinho: {data?.name}</Typography>
                        <Typography style={{ 
                            whiteSpace: 'nowrap',
                            fontSize: '14px',
                            color: '#666'
                        // }}>Valor: {formatCurrency(data?.price)}</Typography>
                        }}>Valor: {Number(data?.price)}</Typography>
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