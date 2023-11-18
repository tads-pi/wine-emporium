import React from "react";
import ProfileWEContainer from "../Container";
import useProfileWECreditCardAddNewCard from "./hooks";
import { Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";

export default function ProfileWECreditCardAddNewCard() {
    const {
        isLoading,
        isValid,
        register,
        errors,
        setValue,
        handleSubmit,
        onSubmit,
    } = useProfileWECreditCardAddNewCard()

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
                    <h2>Adicionar Novo Cartão de Crédito</h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '1rem',
                        }}
                    >

                        <div>
                            <InputLabel id="number-label">Número<Required /></InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                {...register('number', {
                                    required: 'Esse campo é obrigatório',
                                    minLength: {
                                        value: 16,
                                        message: 'Número inválido'
                                    }
                                })}
                                inputProps={{
                                    maxLength: 16,
                                }}
                                helperText={errors?.number?.message}
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
                                flexDirection: 'row',
                                gap: '1rem',
                            }}
                        >
                            <div>
                                <InputLabel id="expireMonth-label">Mês de Vencimento<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('expireMonth', {
                                        required: 'Esse campo é obrigatório',
                                        min: {
                                            value: 1,
                                            message: 'Mês inválido'
                                        },
                                        max: {
                                            value: 12,
                                            message: 'Mês inválido'
                                        },
                                    })}
                                    type="number"
                                    inputProps={{
                                        maxLength: 2,
                                        min: 1,
                                        max: 12,
                                    }}
                                    helperText={errors?.expireMonth?.message}
                                    FormHelperTextProps={{
                                        style: {
                                            color: 'red',
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <InputLabel id="expireYear-label">Ano de Vencimento<Required /></InputLabel>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    {...register('expireYear', {
                                        required: 'Esse campo é obrigatório',
                                        min: {
                                            value: 2023,
                                            message: 'Ano inválido'
                                        },
                                        max: {
                                            value: 2050,
                                            message: 'Ano inválido'
                                        }
                                    })}
                                    type="number"
                                    inputProps={{
                                        maxLength: 4,
                                        min: 2023,
                                        max: 2050,
                                    }}
                                    helperText={errors?.expireYear?.message}
                                    FormHelperTextProps={{
                                        style: {
                                            color: 'red',
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel id="cvv-label">Código Verificador<Required /></InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                {...register('cvv', {
                                    required: 'Esse campo é obrigatório',
                                    min: {
                                        value: 100,
                                        message: 'Código inválido'
                                    }
                                })}
                                inputProps={{
                                    maxLength: 3,
                                }}
                                helperText={errors?.cvv?.message}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <InputLabel id="full_name-label">Nome Completo<Required /></InputLabel>
                            <TextField
                                variant="outlined"
                                fullWidth
                                {...register('full_name', {
                                    required: 'Esse campo é obrigatório',
                                    min: {
                                        value: 3,
                                        message: 'Nome inválido'
                                    }
                                })}
                                helperText={errors?.full_name?.message}
                                FormHelperTextProps={{
                                    style: {
                                        color: 'red',
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <InputLabel id="flag-label">Bandeira<Required /></InputLabel>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    name="flag"
                                    aria-label="flag"
                                    onChange={(e) => register('flag', {
                                        value: e.target.value,
                                        required: 'Esse campo é obrigatório',
                                    })}
                                >
                                    <FormControlLabel value="VISA" control={<Radio />} label={
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                        }}>
                                            <img src="/visa.png" alt="visa" width={25} />
                                            Visa
                                        </div>
                                    } />
                                    <FormControlLabel value="MASTERCARD" control={<Radio />} label={
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                        }}>
                                            <img src="/mastercard.png" alt="mastercard" width={25} />
                                            Mastercard
                                        </div>
                                    } />
                                </RadioGroup>
                            </FormControl>
                        </div>

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
                                    : 'Salvar Cartão'
                            }
                        </Button>
                    </div>
                </form>
            </div >
        </ProfileWEContainer >
    )
};

function Required() {
    return (
        <span style={{ color: 'red' }}>*</span>
    )
}