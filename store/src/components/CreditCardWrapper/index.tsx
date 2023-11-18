import React from "react";
import { CreditCard } from "../../zustand/types"
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type CreditCardProps = {
    card: CreditCard;
    onDelete: (card: CreditCard) => void;
}

export default function CreditCardWrapper(props: CreditCardProps) {
    const {
        id,
        expirationDate,
        hiddenNumber,
        flag,
    } = props.card;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '1rem',
                border: '1px solid darkgray',
                borderRadius: '0.5rem',
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
                    {
                        flag === 'MASTERCARD'
                            ? <img src="/mastercard.png" alt="mastercard" width={25} />
                            : <img src="/visa.png" alt="visa" width={25} />
                    }
                </div>

                <div>
                    <span style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.25rem',
                    }}>
                        <p>{hiddenNumber}</p>
                    </span>
                    <span>
                        <p>venc. {expirationDate}</p>
                    </span>
                </div>
            </div>

            <div
                style={{
                    width: '25px',
                    height: '25px',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    cursor: 'pointer',
                }}
            >
                <Tooltip title="Deletar Cartão">
                    <IconButton
                        onClick={() => props.onDelete(props.card)}
                    >
                        <DeleteIcon color='error' />
                    </IconButton>
                </Tooltip>
            </div>

        </div>
    )
};
