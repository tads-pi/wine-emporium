import React from "react"
import ProfileWEContainer from "../Container"
import { Button, InputLabel, TextField } from "@mui/material"
import useProfileWEAddressAddNewAddress from "./hooks"
import Required from "../../../../components/Required"

export default function ProfileWEAddressAddNewAddress() {
    const {
        isLoading,
        isValid,
        register,
        errors,
        setValue,
        handleSubmit,
        onSubmit,
        handleZipCodeChange,
        haveZip,
    } = useProfileWEAddressAddNewAddress()

    return (
        <ProfileWEContainer>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div>
                    <h2>Adicionar Novo Endereço</h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <div>
                        <InputLabel id="zip-label">CEP<Required /></InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            {...register('zip', { required: 'Esse campo é obrigatório' })}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            inputProps={{
                                maxLength: 8,
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '1rem',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: '1rem',
                            }}
                        >
                            <div>
                                <InputLabel id="city-label">Cidade<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('city', { required: 'Esse campo é obrigatório' })}
                                    disabled={haveZip}
                                />
                            </div>
                            <div>
                                <InputLabel id="state-label">Estado<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('state', { required: 'Esse campo é obrigatório' })}
                                    disabled={haveZip}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: '1rem',
                            }}
                        >
                            <div>
                                <InputLabel id="neighborhood-label">Bairro<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('neighborhood', { required: 'Esse campo é obrigatório' })}
                                    disabled={haveZip}
                                />
                            </div>
                            <div>
                                <InputLabel id="street-label">Rua<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('street', { required: 'Esse campo é obrigatório' })}
                                    disabled={haveZip}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <InputLabel id="complement-label">Complemento</InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            {...register('complement')}
                        />
                    </div>

                    <div>
                        <InputLabel id="number-label">Número<Required /></InputLabel>
                        <TextField
                            variant="outlined"
                            fullWidth
                            {...register('number', { required: 'Esse campo é obrigatório' })}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0.25rem',
                    }}>
                        <Required />
                        <p
                            style={{
                                fontSize: '0.75rem',
                                color: 'gray',
                            }}
                        >indica que o campo é obrigatório</p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            type="submit" variant="contained" color="success"
                            disabled={!isValid || isLoading}
                        >
                            {
                                isLoading
                                    ? 'Carregando...'
                                    : 'Salvar Endereço'
                            }
                        </Button>
                    </div>
                </form>
            </div >
        </ProfileWEContainer >
    )
};