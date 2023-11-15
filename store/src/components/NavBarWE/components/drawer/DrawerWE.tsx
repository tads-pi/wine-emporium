import Drawer from "@mui/material/Drawer"
import React, { useEffect, useState } from "react"
import { Cart, CartProduct, Product } from "../../../../zustand/types"
import Typography from "@mui/material/Typography"
import { formatCurrency } from "../../../../utils/formatCurrency"
import { CartProductCard } from "../../../CartProductCard"
import useDrawer from "./useDrawer"
import "./drawerWE.css"
import Loading from "../../../loading"

type DrawerWEProps = {
    drawerOpen: boolean,
    hideOrShowDrawer: () => void,
}

export default function DrawerWE({ drawerOpen, hideOrShowDrawer }: DrawerWEProps) {
    const {
        cartState,
        getCart,
        removeProduct,
        handleGoToCheckout
    } = useDrawer()

    const [price, setPrice] = useState<number>(cartState?.price || 0)
    useEffect(() => {
        getCart()
        setPrice(cartState?.price || 0)
    }, [])

    const [fakeState, setFakeState] = useState<boolean>(false)
    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={hideOrShowDrawer}
            onMouseMove={() => {
                // TODO por algum motivo o drawer não atualiza quando deveria,
                // então eu criei esse state fake pra forçar a atualização
                // soh que isso cria uma porrada de atualização de uma vez, o ideal
                // é tentar refatorar isso pra alguma outra coisa!!
                setFakeState(!fakeState)
                setPrice(cartState?.price || 0)
            }}

            style={{
                overflow: 'hidden'
            }}
        >
            {
                cartState
                    ?
                    <>
                        <ProductsWrapper>
                            {
                                cartState.products.length > 0
                                    ?
                                    <ShowCartProducts
                                        cart={cartState}
                                        removeProduct={removeProduct}
                                    />

                                    :
                                    <EmptyCart />
                            }
                        </ProductsWrapper>

                        <BottomWrapper>
                            {
                                cartState.products.length > 0 &&
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Total: ${formatCurrency(price)}
                                    </Typography>
                                    <GoToCheckoutButton
                                        handleGoToCheckout={handleGoToCheckout}
                                    />
                                </>
                            }
                        </BottomWrapper>
                    </>
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
            maxWidth: '400px',
            height: '75%',
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
                height: '25%',
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

function ShowCartProducts({ cart, removeProduct }: { cart: Cart, removeProduct: (productId: string) => void }) {
    return (
        <>
            {
                [...new Set(cart.products)].map((product) => product.amount > 0 && (
                    <CartProductCard
                        key={product.id}
                        product={product}
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
            }}
        >
            <img src={'/8504.jpg'} alt="Carrinho vazio" width={250} />
            <p>Carrinho vazio</p>
        </div>
    )
}