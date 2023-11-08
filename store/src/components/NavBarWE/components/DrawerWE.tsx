import Drawer from "@mui/material/Drawer"
import React from "react"
import { CartItem } from "../../../zustand/types"
import Typography from "@mui/material/Typography"
import { formatCurrency } from "../../../utils/formatCurrency"
import { CartItemCard } from "../../CartItemCard"
import { useNavigate } from "react-router-dom"
import { routes } from "../../../config/routes"
import "./drawerWE.css"

type DrawerWEProps = {
    isLoggedIn: boolean,
    drawerOpen: boolean,
    hideOrShowDrawer: () => void,
    cartItems: CartItem[],
    totalPrice: number,
    removeCartItem: (index: number) => void
}

export default function DrawerWE({ isLoggedIn, drawerOpen, hideOrShowDrawer, cartItems, totalPrice, removeCartItem }: DrawerWEProps) {
    const navigate = useNavigate()

    function handleGoToCheckout() {
        if (!isLoggedIn) {
            navigate(routes.LOGIN)
            return
        }
        if (cartItems.length > 0) {
            navigate(routes.CHECKOUT)
        }
    }

    return (
        <Drawer
            anchor="right" // Set the anchor to "right" for right side placement
            open={drawerOpen} // Control open/close state
            onClose={hideOrShowDrawer} // Function to close the Drawer
            style={{ overflow: 'hidden' }}
        >
            <div style={{
                paddingTop: '2rem',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                width: '400px',
                height: '75%',
                overflow: 'scroll'
            }}>
                {/* TODO refatorar esse drawer, por algum motivo ele ta usando 100% da tela! */}
                {[...new Set(cartItems)].map((wine, index) => (
                    <CartItemCard key={index} data={wine} removeFromCart={() => removeCartItem(index)} />
                ))}
            </div>

            <div
                style={{
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    width: '100%',
                    height: '25%',
                }}
            >
                {
                    cartItems.length == 0 ?
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: "1px solid green",
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <img src={'../../../public/8504.jpg'} alt="Carrinho vazio" width={"50%"} />
                                <p>Carrinho vazio</p>
                            </div>
                        </div>
                        :
                        <div>
                            <Typography variant="h6" gutterBottom>
                                <p>{cartItems.length > 0 && `Total: ${formatCurrency(totalPrice)}`}</p>
                            </Typography>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
                                <button className="checkout-button" onClick={handleGoToCheckout}>Comprar</button>
                            </div>
                        </div>
                }
            </div>
        </Drawer >
    )
};
