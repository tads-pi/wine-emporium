import React from "react";
import { Address } from "../../zustand/types"
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

type AddressWrapperProps = {
    address: Address;
    onDelete: (address: Address) => void;
    onMark: (address: Address) => void;
}

export default function AddressWrapper(props: AddressWrapperProps) {
    const {
        id,
        country,
        state,
        city,
        neighborhood,
        street,
        number,
        zip,
        complement,
        marked,
    } = props.address;

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
                    <HomeIcon color='disabled' />

                    <div style={{
                        width: '25px',
                        height: '50px',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        cursor: 'pointer',
                    }}>
                        <Tooltip title={
                            marked
                                ? "Principal"
                                : "Marcar como Principal"
                        }>
                            <IconButton
                                onClick={() => props.onMark(props.address)}
                            >
                                {
                                    marked
                                        ? <StarIcon color="warning" />
                                        : <StarBorderIcon />
                                }
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <span style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.25rem',
                    }}>
                        <p>{street} Nº{number}</p>
                        {
                            complement &&
                            <>
                                <p>-</p>
                                <p>{complement}</p>
                            </>
                        }
                    </span>
                    <span>
                        <p>CEP {zip} - {neighborhood} - {city}</p>
                    </span>
                    <span>
                        <p>{state} - {country}</p>
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
                <Tooltip title="Deletar Endereço">
                    <IconButton
                        onClick={() => props.onDelete(props.address)}
                    >
                        <DeleteIcon color='error' />
                    </IconButton>
                </Tooltip>
            </div>

        </div>
    )
};
