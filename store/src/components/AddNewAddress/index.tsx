import React from "react"
import { NewAddress } from "../../zustand/types"
import useAddNewAddress from "./hooks"
import { Button, InputLabel, TextField } from "@mui/material"
import Required from "../Required"

interface AddNewAddressProps {
    onSubmit: (data: NewAddress) => void
    title?: string
    hideTitle?: boolean
    submitText?: string
}

export default function AddNewAddress(props: AddNewAddressProps) {
    const {
        isValid,
        isDirty,
        register,
        errors,
        handleSubmit,
        onSubmit,
        handleZipCodeChange,
        haveZip,
    } = useAddNewAddress({ onSubmit: props.onSubmit })

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div>
                {
                    props.hideTitle ? null :
                        <h2>{props.title || "Adicionar Novo Endereço"}</h2>
                }
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
                        size="small"
                        fullWidth
                        {...register('zip', {
                            required: 'Esse campo é obrigatório',
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: 'CEP inválido',
                            },
                            minLength: {
                                value: 8,
                                message: 'CEP inválido',
                            },
                            maxLength: {
                                value: 8,
                                message: 'CEP inválido',
                            }
                        })}
                        onChange={(e) => handleZipCodeChange(e.target.value)}
                        inputProps={{
                            maxLength: 8,
                        }}
                        error={!!errors?.zip}
                        helperText={errors?.zip?.message}
                        FormHelperTextProps={{
                            style: {
                                color: 'red',
                            }
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
                                size="small"
                                fullWidth
                                {...register('city', { required: 'Esse campo é obrigatório' })}
                                disabled={haveZip}
                            />
                        </div>
                        <div>
                            <InputLabel id="state-label">Estado<Required /></InputLabel>
                            <TextField
                                variant="outlined"
                                size="small"
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
                                size="small"
                                fullWidth
                                {...register('neighborhood', { required: 'Esse campo é obrigatório' })}
                                disabled={haveZip}
                            />
                        </div>
                        <div>
                            <InputLabel id="street-label">Rua<Required /></InputLabel>
                            <TextField
                                variant="outlined"
                                size="small"
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
                        size="small"
                        fullWidth
                        {...register('complement')}
                    />
                </div>

                <div>
                    <InputLabel id="number-label">Número<Required /></InputLabel>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        {...register('number', {
                            required: 'Esse campo é obrigatório',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Número inválido',
                            },
                        })}
                        error={!!errors?.number}
                        helperText={errors?.number?.message}
                        FormHelperTextProps={{
                            style: {
                                color: 'red',
                            }
                        }}
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
                        disabled={!isValid || !isDirty}
                    >
                        {props.submitText || 'Adicionar'}
                    </Button>
                </div>
            </form>
        </div >
    )
};
