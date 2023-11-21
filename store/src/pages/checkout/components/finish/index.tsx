import React, { useState } from "react"
import useCheckoutFinish from "./hooks"
import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { ArrowBackIos } from "@mui/icons-material"
import Loading from "../../../../components/loading"
import { CartProduct } from "../../../../zustand/types"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';

interface CheckoutFinishProps {
    handleNext: () => void,
    handleBack: () => void,
    goHome: () => void,
}

export default function CheckoutFinish(props: CheckoutFinishProps) {
    const {
        isLoading,
        checkout,
        onSubmit,
    } = useCheckoutFinish(props)

    return (
        <form onSubmit={onSubmit}>
            <div>
                <Button
                    variant="outlined"
                    color="inherit"
                    size='small'
                    onClick={() => props.handleBack()}
                    style={{
                        margin: '1rem 0',
                    }}
                    startIcon={<ArrowBackIos fontSize="small" />}
                >
                    Voltar
                </Button>
            </div>

            {
                isLoading ? <Loading /> :
                    (checkout) ?
                        <div style={{
                            display: 'flex',
                            flexDirection: window.innerWidth > 600 ? 'row' : 'column',
                            gap: '1rem',
                        }}>
                            <Card sx={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}>
                                <Typography variant="h5" component="div" sx={{ padding: '1rem' }}>
                                    Produtos
                                </Typography>
                                {
                                    checkout.cart.products.map((product) => (
                                        <div key={product.id}>
                                            <ProductWrapper
                                                product={product}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                    ))
                                }
                                <Typography variant="h6" component="div" sx={{ padding: '1rem' }}>
                                    Total: R$ {checkout.price}
                                </Typography>
                            </Card>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}>
                                <Card sx={{ display: 'flex', height: 'fit-content' }}>
                                    <CardContent>
                                        <HomeIcon />
                                        <Typography variant="subtitle1" component="div">
                                            Endereço de entrega
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            {checkout.address.street}, {checkout.address.number}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            {checkout.address.neighborhood}, {checkout.address.city} - {checkout.address.state}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            {checkout.address.zip}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ display: 'flex', height: 'fit-content' }}>
                                    <CardContent>
                                        <LocalShippingIcon />
                                        <Typography variant="subtitle1" component="div">
                                            Frete
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            {checkout.deliverer.name}
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            R$ {checkout.deliverer.fare}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ display: 'flex', height: 'fit-content' }}>
                                    <CardContent>
                                        {
                                            checkout.payment.bankSlip
                                                ? <ReceiptIcon />
                                                : <CreditCardIcon />
                                        }
                                        <Typography variant="subtitle1" component="div">
                                            Forma de Pagamento
                                        </Typography>
                                        <Typography variant="body2" component="div">
                                            {checkout.payment.bankSlip ? 'Boleto Bancário' : 'Cartão de Crédito'}
                                        </Typography>
                                        {
                                            checkout.payment.bankSlip ?
                                                <Typography variant="h6" component="div">
                                                    R$ {Number(checkout.price + checkout.deliverer.fare).toFixed(2)}
                                                </Typography>
                                                :
                                                <>
                                                    <Typography variant="body2" component="div">
                                                        <CreditCardIcon fontSize='small' />
                                                        {checkout.payment.creditCard?.hiddenNumber}
                                                    </Typography>
                                                    <Typography variant="h6" component="div">
                                                        {checkout.payment.installments}x de R$ {checkout.payment.installmentsValue}
                                                    </Typography>
                                                </>
                                        }
                                    </CardContent>
                                </Card>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type='submit'
                                        size="large"
                                        style={{
                                            width: '100%',
                                            margin: '2rem 0',
                                        }}
                                        endIcon={<ReceiptIcon />}
                                    >
                                        Finalizar Pedido
                                    </Button>
                                </div>
                            </div>
                        </div>
                        : null
            }

        </form>
    )
};

function ProductWrapper({ product, isLoading }: { product: CartProduct, isLoading: boolean }) {
    return (
        <Card style={{
            display: 'flex',
        }}>
            {
                isLoading ?
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}>
                        <Loading />
                    </div>
                    :
                    <>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 'min(10vw, 100px)',
                                objectFit: 'contain',
                            }}
                            image={product.images[0].url}
                            alt="imagem do produto"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}>
                                <div>
                                    <Typography component="div" variant="subtitle1">
                                        {product.name}
                                    </Typography>
                                    <Typography component="div" variant="subtitle2">
                                        R$ {product.price} x{product.amount}
                                    </Typography>
                                </div>
                                <Typography component="div" variant="subtitle1">
                                    R${Number(product.price * product.amount).toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Box>
                    </>
            }
        </Card>
    );
}
