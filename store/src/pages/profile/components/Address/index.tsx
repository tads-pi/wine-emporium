import React from 'react';
import ProfileWEContainer from '../Container';
import AddressWrapper from '../../../../components/AddressWrapper';
import Loading from '../../../../components/loading';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useProfileWEAddress from './hooks';

export default function ProfileWEAddress() {
    const {
        addresses,
        goToAddNewAddress,
        deleteAddress,
        markAddress,
    } = useProfileWEAddress();

    return (
        <ProfileWEContainer>
            <div>
                <h2>Endereços</h2>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                marginBottom: '10rem',
                // border: '1px solid red',
            }}>

                {
                    addresses ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            {
                                addresses
                                    // Organiza os endereços marcados primeiro
                                    .sort((a, b) => (a.marked === true ? -1 : 1))
                                    .map((address) => (
                                        <AddressWrapper
                                            key={address.id}
                                            address={address}
                                            onDelete={deleteAddress}
                                            onMark={markAddress}
                                        />
                                    ))
                            }

                            <AddNewAddress
                                onClick={goToAddNewAddress}
                            />
                        </div>

                        : <Loading />
                }


            </div>

        </ProfileWEContainer>
    )
}

function AddNewAddress({ onClick }: { onClick: () => void }) {
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
            <h5>Adicionar novo endereço</h5>
            <ArrowForwardIosIcon />
        </div>
    )
}