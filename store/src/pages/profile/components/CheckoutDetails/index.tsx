import React from "react"
import { useParams } from "react-router-dom";
import ProfileWEContainer from "../Container";
import { Button, Tooltip } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import useProfileWECheckoutDetails from "./hooks";
import dayjs from "dayjs";
import Loading from "../../../../components/loading";
import 'dayjs/locale/pt-br';
import { Checkout } from "../../../../zustand/types";
import { formatCurrency } from "../../../../utils/formatCurrency";
dayjs.locale('pt-br');

export default function ProfileWECheckoutDetails() {
    const { id } = useParams();
    const {
        checkout,
        goBack,
    } = useProfileWECheckoutDetails({ checkoutId: id })

    return (
        <ProfileWEContainer>
            {
                !checkout ? <Loading /> :
                    <div>
                        <div style={{
                            display: 'flex',
                            width: '100%',

                            // border: '1px solid red'
                        }}>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => goBack()}
                            >
                                <ArrowBackIos sx={{ fontSize: '16px' }} />
                                Voltar
                            </Button>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',

                            // border: '1px solid blue'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: window.innerWidth > 600 ? '50%' : '100%',
                                overflow: 'scroll',
                                gap: '0.25rem',
                                padding: '1rem',

                                // border: '1px solid purple'
                            }}>
                                <div>
                                    <ResumeHeaders checkout={checkout} />
                                </div>
                                <hr />
                                <div>
                                    <ResumeReceipt checkout={checkout} />
                                </div>
                                <hr />
                                <div>
                                    <ResumeAddress checkout={checkout} />
                                </div>
                                <hr />
                                <div>
                                    <ResumePayment checkout={checkout} />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </ProfileWEContainer>
    )
};

function ResumeAddress({ checkout }: { checkout: Checkout }) {
    return (
        <div>
            <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ fontSize: '14px', color: 'black', margin: 0 }}>
                    Endereço de Entrega
                </p>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '0.25rem',
            }}>
                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: 'gray',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {checkout.address.street}, {checkout.address.number}
                    <br />
                    {checkout.address.neighborhood}, {checkout.address.city} - {checkout.address.state}
                    <br />
                    {checkout.address.zip}
                </p>
            </div>
        </div>
    )
}

function ResumePayment({ checkout }: { checkout: Checkout }) {
    return (
        <div>
            <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ fontSize: '14px', color: 'black', margin: 0 }}>
                    Método de Pagamento
                </p>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
                    {checkout.payment.bankSlip ? 'Boleto' : 'Cartão de crédito'}
                </p>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '0.25rem',
            }}>
                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: 'gray',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {checkout.payment.installments}x
                </p>
                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: '#333',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    R$ {checkout.payment.installmentsValue}
                </p>
            </div>
        </div>
    )
}

function ResumeReceipt({ checkout }: { checkout: Checkout }) {
    const products = checkout.cart.products.map((product) => {
        return {
            name: product.name,
            price: product.price,
            amount: product.amount,
        }
    })

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            {
                products.map((product, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                        // border: '1px solid red'
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            overflow: 'hidden',
                            // border: '1px solid green',
                        }}>
                            <Tooltip title={product.name}>
                                <p style={{
                                    fontSize: '12px',
                                    margin: 0,
                                    color: 'gray',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {product.name}
                                </p>
                            </Tooltip>
                            <p style={{
                                fontSize: '12px',
                                margin: 0,
                                color: 'gray',
                            }}>
                                {product.amount}x
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            width: 'fit-content',
                            flexDirection: 'column',
                            gap: '0.25rem',
                            // border: '1px solid purple'
                        }}>
                            <p style={{
                                fontSize: '12px',
                                margin: 0,
                                color: 'gray',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                                {formatCurrency(product.price)}
                            </p>
                            <p style={{
                                fontSize: '12px',
                                margin: 0,
                                color: '#333',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                                {formatCurrency(product.price * product.amount)}
                            </p>
                        </div>
                    </div>
                ))
            }
            <div style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                <Tooltip title={checkout.deliverer.name}>
                    <p style={{
                        fontSize: '12px',
                        margin: 0,
                        color: 'gray',
                    }}>
                        {checkout.deliverer.name} (frete)
                    </p>
                </Tooltip>
                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: '#333',
                }}>
                    {formatCurrency(checkout.deliverer.fare)}
                </p>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                paddingTop: '0.5rem',
            }}>
                <p style={{
                    fontSize: '14px',
                    margin: 0,
                    color: '#333',
                }}>
                    Total:
                </p>
                <p style={{
                    fontSize: '14px',
                    margin: 0,
                    color: '#333',
                }}>
                    R$ {checkout.price}
                </p>
            </div>
        </div>
    )
}

function ResumeHeaders({ checkout }: { checkout: Checkout }) {
    return (
        <header style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            gap: '0.5rem',
            // border: '1px solid green'
        }}>
            <h5 style={{
                fontSize: '24px',
                color: '#333',
            }}>
                Resumo do Pedido
            </h5>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0.25rem',
                gap: '0.5rem',
            }}>
                <span style={{
                    fontSize: '12px',
                    margin: 0,
                    color: 'gray',
                }}>
                    {(() => {
                        switch (checkout.status) {
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
                                return checkout.status;
                        }
                    })()}
                </span>

                <div style={{ minHeight: '100%', border: '1px solid gray' }} ></div>

                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: 'gray',
                }}>
                    Pedido #{checkout.sequentialId}
                </p>
            </div>
        </header>
    )
}