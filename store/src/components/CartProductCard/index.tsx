import React from 'react'

import { CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { VariantType, enqueueSnackbar } from 'notistack'
import { FALLBACK_IMAGE_URL } from '../../config/images';
import { CartProduct } from '../../zustand/types';
import { formatCurrency } from '../../utils/formatCurrency';

type CartProductCardProps = {
    product: CartProduct,
    addInCart: () => void
    removeFromCart: () => void
}

export function CartProductCard({ product, addInCart, removeFromCart }: CartProductCardProps) {
    function removeItem() {
        removeFromCart()
    }
    function addItem() {
        addInCart()
    }

    function getImage() {
        if (product?.images.length > 0) {
            const [markedImage] = product?.images.filter((img) => img.marked)
            if (markedImage) {
                return markedImage.url
            }
            return product?.images[0].url
        } else {
            return FALLBACK_IMAGE_URL
        }
    }

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
                        image={getImage()}
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
                            marginBottom: '5px',

                            // limita o numero de caracteres na tela e adiciona reticencias
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '250px',
                        }}>Vinho: {product.name}</Typography>
                        <Typography style={{
                            whiteSpace: 'nowrap',
                            fontSize: '14px',
                            color: '#666'
                        }}>x{Number(product.amount)}</Typography>
                        <Typography style={{
                            whiteSpace: 'nowrap',
                            fontSize: '14px',
                            color: '#666'
                        }}>Valor: {formatCurrency(Number(product.price))}</Typography>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.5rem',
                            }}
                        >
                            <div>
                                <IconButton
                                    aria-label="remove uma unidade do carrinho"
                                    size="small"
                                    onClick={removeItem}
                                    style={{
                                        backgroundColor: 'lightcoral',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                    }}
                                >
                                    -
                                </IconButton>
                            </div>
                            <div>
                                <IconButton
                                    aria-label="adiciona uma unidade ao carrinho"
                                    size="small"
                                    onClick={addItem}
                                    style={{
                                        backgroundColor: 'lightgreen',
                                        borderRadius: '50%',
                                        width: '25px',
                                        height: '25px',
                                    }}
                                >
                                    +
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}