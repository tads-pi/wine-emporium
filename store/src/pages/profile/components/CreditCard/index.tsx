import React from 'react';
import ProfileWEContainer from '../Container';
import CreditCardWrapper from '../../../../components/CreditCardWrapper';
import Loading from '../../../../components/loading';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCardIcon from '@mui/icons-material/AddCard';
import useProfileWECreditCard from './hooks';
import { Button } from '@mui/material';

export default function ProfileWECreditCard() {
    const {
        creditCards,
        goToAddNewCreditCard,
        deleteCreditCard,
    } = useProfileWECreditCard();

    return (
        <ProfileWEContainer>
            <div>
                <h2>Cartões de Crédito</h2>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                marginBottom: '10rem',
                // border: '1px solid red',
            }}>

                {
                    creditCards ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            {
                                creditCards.map((card) => (
                                    <CreditCardWrapper
                                        key={card.id}
                                        card={card}
                                        onDelete={deleteCreditCard}
                                    />
                                ))
                            }

                            {
                                creditCards.length === 0 ?
                                    <NoCreditCards
                                        onClick={goToAddNewCreditCard}
                                    />
                                    :

                                    <AddNewCreditCard
                                        onClick={goToAddNewCreditCard}
                                    />
                            }
                        </div>

                        : <Loading />
                }


            </div>

        </ProfileWEContainer>
    )
}

function NoCreditCards({ onClick }: { onClick: () => void }) {
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
                <img src="/credit-card-not-found.png" width={200} />
                <p style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: 'lighter',
                    color: 'gray',
                }}>
                    Parece que você ainda não cadastrou nenhum cartão de crédito... 🙁
                </p>

                <Button
                    variant='contained'
                    color='success'
                    onClick={onClick}
                >
                    Cadastrar agora
                </Button>
            </div>
        </div>
    )
}

function AddNewCreditCard({ onClick }: { onClick: () => void }) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',

                padding: '1rem',
                border: '1px solid darkgray',
                borderRadius: '0.5rem',
            }}

            onClick={onClick}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem'
            }}>
                <AddCardIcon color='success' />
                <h5>Cadastrar novo cartão</h5>
            </div>
            <ArrowForwardIosIcon />
        </div>
    )
}