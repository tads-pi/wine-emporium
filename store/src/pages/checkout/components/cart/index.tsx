import React, { useState } from "react"
import { Box, Button, Card, CardContent, CardMedia, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, useTheme } from "@mui/material"
import { Address, CartProduct, Checkout, Deliverer } from "../../../../zustand/types";
import useCheckoutCart from "./hooks"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Loading from "../../../../components/loading";
import useStore from "../../../../zustand/store";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

interface CheckoutCartProps {
    handleNext: () => void,
    goHome: () => void,
}

export default function CheckoutCart(props: CheckoutCartProps) {
    const {
        isLoading,
        checkout,
        addresses,
        addProductToCart,
        removeProductFromCart,
        selectedAddress,
        setSelectedAddress,
        selectedDeliverer,
        setSelectedDeliverer,
        deliverers,
        onSubmit,
    } = useCheckoutCart(props)

    return (
        <form onSubmit={onSubmit}>
            
            <div>
                <Button
                    variant="outlined"
                    color="inherit"
                    size='small'
                    onClick={() => props.goHome()}
                    style={{
                        margin: '1rem 0',
                    }}
                    startIcon={<ArrowBackIos fontSize="small" />}
                >
                    Voltar
                </Button>
            </div>

            <div style={{
                display: 'flex',
            }}>
                {
                    (checkout && addresses && deliverers && selectedAddress)
                        ?
                        <div
                            className="g-1"
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: window.innerWidth > 600 ? 'row' : 'column',
                            }}
                        >
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
                                                addProduct={addProductToCart}
                                                removeProduct={removeProductFromCart}
                                            />
                                        </div>
                                    ))
                                }
                            </Card>

                            <div style={{
                                display: 'flex',
                                position: 'sticky',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                            }}>
                                <ResumeWrapper
                                    isLoading={isLoading}
                                    checkout={checkout}
                                    addresses={addresses}
                                    selectedAddress={selectedAddress}
                                    setSelectedAddress={setSelectedAddress}
                                    deliverers={deliverers}
                                    selectedDeliverer={selectedDeliverer}
                                    setSelectedDeliverer={setSelectedDeliverer}
                                />
                            </div>
                        </div>
                        : <Loading />
                }
            </div>
        </form>
    )
};

function ProductWrapper({ product, addProduct, removeProduct }: { product: CartProduct, addProduct: (id: string) => Promise<void>, removeProduct: (id: string) => Promise<void> }) {
    const [amount, setAmount] = useState(product.amount)
    const [isLoading, setIsLoading] = useState(false)

    function addToCart() {
        setIsLoading(true)
        addProduct(product.id)
            .then(() => {
                setAmount(amount + 1)
                setIsLoading(false)
            })
    }
    function removeFromCart() {
        setIsLoading(true)
        removeProduct(product.id)
            .then(() => {
                setAmount(amount - 1)
                setIsLoading(false)
            })
    }

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
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="subtitle1">
                                    {product.name}
                                </Typography>
                                <Typography component="div" variant="subtitle2">
                                    R$ {product.price}
                                </Typography>
                            </CardContent>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                <Card sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    margin: '0.25rem',
                                }}>
                                    <IconButton aria-label="remove" onClick={() => removeFromCart()}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography sx={{ minWidth: 20, textAlign: 'center' }}>
                                        {amount}
                                    </Typography>
                                    <IconButton aria-label="add" onClick={() => addToCart()}>
                                        <AddIcon />
                                    </IconButton>
                                </Card>
                                <div style={{
                                    padding: '0.5rem',
                                }}>
                                    <Typography component="div" variant="subtitle2">
                                        R${Number(product.price * product.amount).toFixed(2)}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                    </>
            }
        </Card>
    );
}

function ResumeWrapper({
    isLoading,
    checkout,
    addresses,
    selectedAddress,
    setSelectedAddress,
    deliverers,
    selectedDeliverer,
    setSelectedDeliverer,
}: { isLoading: boolean, checkout: Checkout, addresses: Address[], selectedAddress: Address, setSelectedAddress: (address: Address) => void, deliverers: Deliverer[], selectedDeliverer: Deliverer | null, setSelectedDeliverer: (deliverer: Deliverer) => void }) {

    function buildAddressLabel(address: Address): string {
        return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`
    }

    console.log({checkout});

    return (
        <Card sx={{
            width: '100%',
            height: 'fit-content',
            padding: '1rem 0.5rem',
        }}>
            <div className="flex-column p-1">
                <InputLabel id="gender-label">
                    Endereço de entrega
                </InputLabel>
                <Select
                    value={selectedAddress.id}
                    onChange={(e) => {
                        setSelectedAddress(addresses.filter((address) => address.id === e.target.value)[0])
                    }}
                    sx={{ width: '100%' }}
                >
                    {addresses && addresses.map((address, i) => {
                        const label = buildAddressLabel(address)
                        return (
                            <MenuItem key={i} value={address.id}>
                                {label}
                            </MenuItem>
                        )
                    })}
                </Select>

                {
                    selectedAddress &&
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '1rem',
                    }}>
                        <Typography variant="subtitle1" component="div">
                            Escolha o entregador
                        </Typography>
                        <RadioGroup
                            aria-labelledby="deliverer-radio-group"
                            name="deliverer-radio-buttons-group"
                            value={selectedDeliverer?.id}
                            onChange={(e) => {
                                setSelectedDeliverer(deliverers.filter((deliverer) => deliverer.id === e.target.value)[0])
                            }}
                        >
                            {
                                deliverers.map((deliverer, i) => {
                                    return (
                                        <FormControlLabel
                                            key={deliverer.id}
                                            value={deliverer.id}
                                            control={<Radio />}
                                            label={
                                                <Typography variant="body2" color="text.secondary">
                                                    {deliverer.name} - R$ {Number(deliverer.fare).toFixed(2)}
                                                </Typography>
                                            }
                                        />
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                }

                <div className="flex-row">
                    <Typography variant="subtitle1" component="div">
                        Produtos ({checkout.cart.products.length})
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        R$ {Number(checkout.cart.price).toFixed(2)}
                    </Typography>
                </div>

                <div className="flex-row">
                    <Typography variant="subtitle1" component="div">
                        Frete
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        R$ {
                            selectedDeliverer ?
                                Number(selectedDeliverer.fare).toFixed(2)
                                : '0.00'
                        }
                    </Typography>
                </div>
                <div className="flex-row p-1">
                    <Typography variant='h5' component="div">
                        Total
                    </Typography>
                    <Typography variant="h6" component="div">
                        R$ {Number(checkout.cart.price + (selectedDeliverer?.fare || 0)).toFixed(2)}
                    </Typography>
                </div>
            </div>

            <div className='flex-row p-1'>
                <Button
                    fullWidth
                    variant='contained'
                    color='info'
                    type="submit"
                    size='large'
                    disabled={!selectedAddress || !selectedDeliverer || isLoading}
                >
                    {
                        isLoading
                            ? <Loading />
                            : <>Continuar Compra</>
                    }
                </Button>
            </div>
        </Card>
    )
}