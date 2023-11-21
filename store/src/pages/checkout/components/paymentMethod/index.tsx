import React from "react"
import { Box, Button, Card, CardContent, CardMedia, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { ArrowForwardIos } from "@mui/icons-material";
import useCheckoutPaymentMethod from "./hooks";
import Loading from "../../../../components/loading";
import CreditCardWrapper from "../../../../components/CreditCardWrapper";
import { Checkout, CreditCard } from "../../../../zustand/types";
import { routes } from "../../../../config/routes";

interface CheckoutPaymentMethodProps {
    handleNext: () => void,
    goHome: () => void,
}

export default function CheckoutPaymentMethod(props: CheckoutPaymentMethodProps) {
    const {
        checkout,
        selected,
        setSelected,
        installments,
        setInstallments,
        creditCard,
        setCreditCard,
        userCreditCards,
        onSubmit,
    } = useCheckoutPaymentMethod(props)

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                flexDirection: 'column',
                display: 'flex',
                width: '100%',
            }}>
                <Typography variant="h6" component="div">
                    Forma de Pagamento
                </Typography>

                <Card style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    gap: '1rem',
                }}>
                    <Card
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '1rem',
                            gap: '1rem',
                            cursor: 'pointer',
                            width: 'min(60ch, 100%)',
                            backgroundColor: selected === 'bank-slip' ? '#f2f2f2' : 'white',
                        }}
                        onClick={() => setSelected('bank-slip')}
                    >
                        <Box sx={{
                            borderRadius: '50%',
                            backgroundColor: 'lightgray',
                            padding: '0.5rem',
                        }}>
                            <ReceiptIcon />
                        </Box>
                        <Typography variant="h6" component="div">
                            Boleto
                        </Typography>
                    </Card>

                    <Card
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '1rem',
                            gap: '1rem',
                            cursor: 'pointer',
                            width: 'min(60ch, 100%)',
                            backgroundColor: selected === 'credit-card' ? '#f2f2f2' : 'white',
                        }}
                        onClick={() => setSelected('credit-card')}
                    >
                        <Box sx={{
                            borderRadius: '50%',
                            backgroundColor: 'lightgray',
                            padding: '0.5rem',
                        }}>
                            <CreditCardIcon />
                        </Box>
                        <Typography variant="h6" component="div">
                            Cartão de Crédito
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            style={{
                                color: 'green',
                            }}
                        >
                            Até 12x sem juros
                        </Typography>
                    </Card>
                </Card>

                {
                    selected !== 'credit-card' ? null :
                        (checkout === null || userCreditCards === null) ? <Loading /> :
                            userCreditCards.length > 0
                                ? <HaveCreditCards
                                    userCreditCards={userCreditCards}
                                    installments={installments}
                                    setInstallments={setInstallments}
                                    creditCard={creditCard}
                                    setCreditCard={setCreditCard}
                                    checkout={checkout}
                                />
                                : <DoNotHaveCreditCards />
                }

                <div style={{
                    display: 'flex',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    position: window.innerWidth > 600 ? 'inherit' : 'sticky',
                    padding: '1rem',
                }}>
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<ArrowForwardIos fontSize='small' />}
                        style={{
                            marginTop: '1rem',
                            width: 'min(60ch, 100%)',
                        }}
                        disabled={(() => {
                            if (!selected) return true
                            if (selected === 'bank-slip') return false
                            if (selected === 'credit-card') {
                                if (creditCard !== null) {
                                    if (installments > 0) {
                                        return false
                                    }
                                }
                            }
                            return true
                        })()}
                    >
                        Continuar
                    </Button>
                </div>
            </div>
        </form>
    )
};

function DoNotHaveCreditCards({

}: {}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '50%',
                gap: '1rem',
                padding: '1rem',
            }}>
                <Typography variant="subtitle1" component="div">
                    Hmm... Parece que você ainda não cadastrou nenhum cartão de crédito!
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<CreditCardIcon />}
                    style={{
                        marginLeft: '1rem',
                    }}
                    onClick={() => {
                        window.location.href = routes.ACCOUNT_CREDIT_CARD_NEW_CARD
                    }}
                >
                    Cadastrar agora
                </Button>
            </div>
        </div>
    )
}

function HaveCreditCards({
    userCreditCards, installments, setInstallments, checkout, creditCard, setCreditCard
}: { userCreditCards: CreditCard[], installments: number, setInstallments: (value: number) => void, checkout: Checkout, creditCard: CreditCard | null, setCreditCard: (value: CreditCard) => void }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
        }}>
            <Card>
                {
                    userCreditCards.map((card, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '1rem',
                                }}>
                                <Typography variant="subtitle1" component="div">
                                    Escolha o Cartão
                                </Typography>
                                <RadioGroup
                                    aria-labelledby="deliverer-radio-group"
                                    name="deliverer-radio-buttons-group"
                                    value={creditCard?.id}
                                    onChange={(e) => {
                                        setCreditCard(userCreditCards.filter((card) => card.id === e.target.value)[0])
                                    }}
                                >
                                    {
                                        userCreditCards.map((card, i) => {
                                            return (
                                                <FormControlLabel
                                                    key={card.id}
                                                    value={card.id}
                                                    control={<Radio />}
                                                    label={
                                                        <CreditCardWrapper
                                                            key={card.id}
                                                            card={card}
                                                            onDelete={() => { }}
                                                            hideDeleteButton
                                                        />
                                                    }
                                                />
                                            )
                                        })
                                    }
                                </RadioGroup>
                            </div>
                        )
                    })
                }
            </Card>

            <Typography variant="subtitle1" component="div">
                Quantidade de Parcelas
            </Typography>
            <Select
                value={installments}
                onChange={(e) => {
                    setInstallments(e.target.value as number)
                }}
            >
                {(() => {
                    const el: any[] = []
                    for (let i = 0; i < 12; i++) {
                        el.push(
                            <MenuItem key={i} value={i}>
                                {i + 1}x de R$ {Number(checkout.price / (i + 1)).toFixed(2)}
                            </MenuItem>
                        )
                    }

                    return el
                })()}
            </Select>
        </div>
    )
}