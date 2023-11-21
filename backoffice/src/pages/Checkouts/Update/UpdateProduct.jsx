import { useParams } from "react-router-dom";
import LoadingWE from "../../../components/loading/LoadingWE";
import useUpdateCheckout from "./hooks.js"
import { Button, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const validStatus = [
    "AGUARDANDO_PAGAMENTO",
    "PAGAMENTO_COM_SUCESSO",
    "PAGAMENTO_REJEITADO",
    "AGUARDANDO_RETIRADA",
    "EM_TRANSITO",
    "ENTREGUE",
    "CANCELADO",
]

export default function UpdateCheckout() {
    const { id } = useParams()
    const [
        data,
        status,
        setStatus,
        loading,
        goBack,
        saveAndGoBack,
    ] = useUpdateCheckout({ id })

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    Object.keys(data).length > 0 &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        padding: window.innerWidth > 600 ? '3rem' : '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'flex-start',
                        }}>
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={() => goBack()}
                                sx={{
                                    marginBottom: '1rem',
                                }}
                            >
                                <ArrowBackIcon />
                                Voltar
                            </Button>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            justifyContent: 'flex-start',
                            width: '100%'
                        }}>
                            <ResumeHeaders checkout={data} />

                            <div>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    sx={{ width: '50%' }}
                                >
                                    {validStatus.map((status, i) => (
                                        <MenuItem key={i} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <CheckoutReceipt checkout={data} />

                            <div>
                                {
                                    status !== data.status &&
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => saveAndGoBack()}
                                        sx={{
                                            marginTop: '1rem',
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

function CheckoutReceipt({ checkout }) {
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
                                R$ {product.price}
                            </p>
                            <p style={{
                                fontSize: '12px',
                                margin: 0,
                                color: '#333',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                                R$ {product.price * product.amount}
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
                    R$ {checkout.deliverer.fare}
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

function ResumeHeaders({ checkout }) {
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
                <p style={{
                    fontSize: '12px',
                    margin: 0,
                    color: 'gray',
                }}>{(() => {
                    if (!checkout.payedAt) {
                        return 'Aguardando pagamento'
                    }
                    const payedAt = dayjs(checkout.payedAt).format('DD MMMM')
                    return payedAt.split(' ').join(' de ')
                })()}</p>

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