import React from "react";
import Loading from "../../../../components/loading";
import AddNewAddress from "../../../../components/AddNewAddress";
import useAddressInfo from "./hooks";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Checkbox } from "@mui/material";
import { NewAddress } from "../../../../zustand/types";

type AddressInfoProps = {

}

export default function AddressInfo(props: AddressInfoProps) {
    const {
        isLoading,
        haveAnyAddress,
        haveDeliveryAddress,
        optUseSameAddress,
        setOptUseSameAddress,
        saveInvoiceAddress,
        saveDeliveryAddress,
        onSubmit,
    } = useAddressInfo()

    return (
        <div>
            {
                isLoading ? <Loading /> :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            <RegisterNewInvoiceAddressHeader finished={haveAnyAddress()} />
                            {
                                !haveAnyAddress() &&
                                <AddNewAddress
                                    onSubmit={saveInvoiceAddress}
                                    submitText="Cadastrar"
                                    type="BILLING"
                                    hideTitle
                                />
                            }
                        </div>
                        <hr />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}>
                            <RegisterNewDeliveryAddressHeader finished={optUseSameAddress || haveDeliveryAddress()} />
                            {
                                haveAnyAddress() ?
                                    <>
                                        {
                                            !haveDeliveryAddress() &&
                                            <AddressCheckbox
                                                optUseSameAddress={optUseSameAddress}
                                                setOptUseSameAddress={setOptUseSameAddress}
                                            />
                                        }
                                        {
                                            (optUseSameAddress || haveDeliveryAddress())
                                                ? <FinishFormButton onSubmit={onSubmit} />
                                                : <>
                                                    <AddNewAddress
                                                        onSubmit={saveDeliveryAddress}
                                                        submitText="Cadastrar"
                                                        type="SHIPPING"
                                                        hideTitle
                                                    />
                                                </>
                                        }
                                    </>
                                    : null
                            }
                        </div>
                    </div>
            }
        </div>
    )
};

function RegisterNewInvoiceAddressHeader({ finished }: { finished: boolean }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            color: finished ? 'green' : 'gray',
        }}>
            {
                finished
                    ? <CheckCircleIcon color='success' />
                    : <RadioButtonUncheckedIcon />
            }
            Endereço de Faturamento
        </div>
    )
}

function RegisterNewDeliveryAddressHeader({ finished }: { finished: boolean }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            color: finished ? 'green' : 'gray'
        }}>
            {
                finished
                    ? <CheckCircleIcon color='success' />
                    : <RadioButtonUncheckedIcon />
            }
            Endereço de Entrega
        </div>
    )
}

function AddressCheckbox(
    { optUseSameAddress, setOptUseSameAddress }: { optUseSameAddress: boolean, setOptUseSameAddress: (value: boolean) => void }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            cursor: 'pointer',
        }}
            onClick={() => setOptUseSameAddress(!optUseSameAddress)}
        >
            <Checkbox
                checked={optUseSameAddress}
                style={{
                    padding: '0',
                }}
            />
            Usar o mesmo endereço de faturamento
        </div>
    )
}

function FinishFormButton({ onSubmit }: { onSubmit: () => void }) {
    return (
        <div
            style={{
                display: 'flex',
                marginTop: '2rem',
                justifyContent: 'center',
            }}
        >
            <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={onSubmit}
            >
                Finalizar Cadastro
            </Button>
        </div>
    )
}