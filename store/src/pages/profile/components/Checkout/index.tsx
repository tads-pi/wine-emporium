import React from "react";
import ProfileWEContainer from "../Container";
import useProfileWECheckout from "./hooks";
import Loading from "../../../../components/loading";
import { Button } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import CheckoutWrapper from "../../../../components/CheckoutWrapper";

export default function ProfileWECheckout() {
    const {
        checkouts,
        goToCheckoutResume,
        goHome,
    } = useProfileWECheckout();

    return (
        <ProfileWEContainer>
            <div>
                <h2>Pedidos</h2>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                marginBottom: '10rem',
                // border: '1px solid red',
            }}>

                {
                    checkouts ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            {
                                checkouts.map((checkout) => (
                                    <CheckoutWrapper
                                        key={checkout.id}
                                        checkout={checkout}
                                        onClick={goToCheckoutResume}
                                    />
                                ))
                            }

                            {
                                checkouts.length === 0 &&
                                <NoCheckouts goHome={goHome} />
                            }
                        </div>

                        : <Loading />
                }


            </div>

        </ProfileWEContainer>
    )
}

function NoCheckouts({ goHome }: { goHome: () => void }) {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                width: '35%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src="/9212305.jpg" width={200} />
                <p style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: 'lighter',
                    color: 'gray',
                }}>
                    Parece que você ainda não fez nenhuma compra na nossa loja... 🙁
                </p>

                <Button
                    variant='contained'
                    color='success'
                    onClick={goHome}
                >
                    Comprar agora!
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    )
}