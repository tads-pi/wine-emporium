import React from 'react';
import ProfileWEContainer from '../Container';
import CreditCardWrapper from '../../../../components/CreditCardWrapper';
import Loading from '../../../../components/loading';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useProfileWECreditCard from './hooks';

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

                            <AddNewCreditCard
                                onClick={goToAddNewCreditCard}
                            />
                        </div>

                        : <Loading />
                }


            </div>

        </ProfileWEContainer>
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
            <h5>Adicionar novo cartão</h5>
            <ArrowForwardIosIcon />
        </div>
    )
}