import React from "react"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Checkout } from "../../zustand/types";
import { Button } from "@mui/material";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

interface CheckoutWrapperProps {
    checkout: Checkout
    onClick: (checkout: Checkout) => void
}

export default function CheckoutWrapper(props: CheckoutWrapperProps) {
    const {
        checkout: {
            id,
            sequentialId,
            price,
            status,
        },
        onClick,
    } = props

    const products = props.checkout.cart.products.map((product) => (
        product.name
    )).join(', ')

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '1rem',
                border: '1px solid darkgray',
                borderRadius: '0.5rem',
                maxHeight: '35vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                    }}
                >
                    <LocalMallIcon htmlColor={
                        (
                            () => {
                                switch (status) {
                                    case 'AGUARDANDO_PAGAMENTO':
                                        return 'orange';
                                    case 'PAGAMENTO_COM_SUCESSO':
                                        return 'green';
                                    case 'PAGAMENTO_REJEITADO':
                                        return 'red';
                                    case 'AGUARDANDO_RETIRADA':
                                        return 'orange'
                                    case 'EM_TRANSITO':
                                        return 'orange'
                                    case 'ENTREGUE':
                                        return 'green'
                                    case 'CANCELADO':
                                        return 'red'
                                    default:
                                        return 'gray';
                                }
                            }
                        )()
                    } />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.25rem',
                    width: '100%',
                }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}>
                            <span>
                                Pedido #{sequentialId}
                            </span>
                            <span style={{
                                fontSize: '12px',
                                color: 'gray',
                            }}>
                                *{(() => {
                                    switch (status) {
                                        case 'AGUARDANDO_PAGAMENTO':
                                            return 'Aguardando pagamento';
                                        case 'PAGAMENTO_COM_SUCESSO':
                                            return 'Pagamento com sucesso';
                                        case 'PAGAMENTO_REJEITADO':
                                            return 'Pagamento rejeitado';
                                        case 'AGUARDANDO_RETIRADA':
                                            return 'Aguardando retirada'
                                        case 'EM_TRANSITO':
                                            return 'Em trânsito'
                                        case 'ENTREGUE':
                                            return 'Entregue'
                                        case 'CANCELADO':
                                            return 'Cancelado'
                                        default:
                                            return status;
                                    }
                                })()}
                            </span>
                        </div>
                        <span style={{
                            maxHeight: '1.5rem',
                            wordWrap: 'break-word',
                            textOverflow: 'ellipsis',

                            fontSize: '12px',
                            color: 'gray',
                            // overflow: 'hidden',
                        }}>
                            <p>{products}</p>
                        </span>
                    </div>

                    <span style={{
                        fontSize: '1.25rem',
                    }}>
                        R${price}
                    </span>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}>
                <div style={{
                    display: 'flex'
                }}>
                    <Button
                        variant='contained'
                        color='warning'
                        size="small"
                        onClick={() => onClick(props.checkout)}
                    >
                        Detalhes
                        <ArrowForwardIos style={{
                            fontSize: '14px',
                            marginLeft: '0.25rem',
                        }} />
                    </Button>
                </div>
            </div>
        </div>
    )
};
