import Drawer from "@mui/material/Drawer"
import React, { useEffect, useMemo, useState } from "react"
import { Cart, CartProduct, Product } from "../../../../zustand/types"
import Typography from "@mui/material/Typography"
import { formatCurrency } from "../../../../utils/formatCurrency"
import { CartProductCard } from "../../../CartProductCard"
import useDrawer from "./useDrawer"
import "./drawerWE.css"
import Loading from "../../../loading"
import { Box, FormControlLabel, InputLabel, Radio, RadioGroup, TextField } from "@mui/material"

type DrawerWEProps = {
    drawerOpen: boolean,
    hideOrShowDrawer: () => void,
}

export default function DrawerWE({ drawerOpen, hideOrShowDrawer }: DrawerWEProps) {
    const {
        isLoggedIn,
        cartState,
        getCart,
        addProduct,
        removeProduct,
        handleGoToCheckout,
        deliverers,
        zipCode,
        setZipCode,
        selectedDeliverer,
        setSelectedDeliverer,
    } = useDrawer()

    const price = useMemo(() => {
        return cartState?.price
    }, [cartState.price])

    useEffect(() => {
        getCart()
    }, [cartState])

    // Força o update do drawer!
    setInterval(() => {
        setFakeState(!fakeState)
    }, 500)

    const [fakeState, setFakeState] = useState<boolean>(false)
    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={hideOrShowDrawer}
            // onMouseMove={() => {
            //     // TODO por algum motivo o drawer não atualiza quando deveria,
            //     // então eu criei esse state fake pra forçar a atualização
            //     // soh que isso cria uma porrada de atualização de uma vez, o ideal
            //     // é tentar refatorar isso pra alguma outra coisa!!
            //     setFakeState(!fakeState)
            //     setPrice(cartState?.price || 0)
            // }}

            style={{
                overflow: 'hidden',
            }}
        >
            {
                cartState
                    ?
                    <Box
                        sx={{
                            width: window.innerWidth < 600 ? window.innerWidth / 1.25 : 400,
                            height: '100%',
                        }}
                        role="presentation"
                    >
                        <ProductsWrapper>
                            {
                                cartState.products.length > 0
                                    ?
                                    <ShowCartProducts
                                        cart={cartState}
                                        addProduct={addProduct}
                                        removeProduct={removeProduct}
                                    />

                                    :
                                    <EmptyCart />
                            }
                        </ProductsWrapper>

                        <BottomWrapper>
                            {
                                cartState.products.length > 0 && !isLoggedIn &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        backgroundColor: 'white',
                                        paddingBottom: '0.5rem',
                                        zIndex: 1,

                                        border: '1px solid lightgray',
                                        borderRadius: '0.5rem',
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Simular frete
                                        </Typography>
                                        <div>
                                            <InputLabel id="zip-label">Informe o seu CEP</InputLabel>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                onChange={(e) => setZipCode(e.target.value)}
                                                inputProps={{
                                                    maxLength: 8,
                                                }}
                                            />
                                            {
                                                zipCode && zipCode.length === 8 &&
                                                <div>
                                                    <RadioGroup
                                                        aria-labelledby="deliverer-radio-group"
                                                        name="deliverer-radio-buttons-group"
                                                        value={selectedDeliverer?.id}
                                                        onChange={(e) => {
                                                            setSelectedDeliverer(deliverers.filter((deliverer) => deliverer.id === e.target.value)[0])
                                                        }}
                                                    >
                                                        {
                                                            deliverers.map((deliverer) => {
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
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            }
                            {
                                cartState.products.length > 0 &&
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Total: {formatCurrency(price + (selectedDeliverer?.fare || 0))}
                                    </Typography>
                                    <GoToCheckoutButton
                                        handleGoToCheckout={handleGoToCheckout}
                                    />
                                </>
                            }
                        </BottomWrapper>
                    </Box>
                    :
                    <div
                        style={{
                            width: '250px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Loading />
                    </div>
            }
        </Drawer >
    )
};

function ProductsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            paddingTop: '2rem',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            height: '60%',
            overflow: 'scroll',
        }}>
            {children}
        </div>
    )
}

function BottomWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                height: '40%',
            }}
        >
            {children}
        </div>
    )
}

function GoToCheckoutButton({ handleGoToCheckout }: { handleGoToCheckout: () => void }) {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
                <button className="checkout-button" onClick={handleGoToCheckout}>Comprar</button>
            </div>
        </div>
    )
}

function ShowCartProducts({ cart, addProduct, removeProduct }: { cart: Cart, addProduct: (productId: string) => void, removeProduct: (productId: string) => void }) {
    cart.products = cart.products.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <>
            {
                [...new Set(cart.products)].map((product) => product.amount > 0 && (
                    <CartProductCard
                        key={product.id}
                        product={product}
                        addInCart={() => addProduct(product.id)}
                        removeFromCart={() => removeProduct(product.id)}
                    />
                ))
            }
        </>
    )
}

function EmptyCart() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <img
                src={'/8504.jpg'}
                alt="Carrinho vazio"
                style={{
                    width: '50%'
                }}
            />
            <p>Carrinho vazio</p>
        </div>
    )
}