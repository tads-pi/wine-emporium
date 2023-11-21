import React from "react";
import ProfileWEContainer from "../Container";
import useProfileWECreditCardAddNewCard from "./hooks";
import { Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";

export default function ProfileWECreditCardAddNewCard() {
    const {
        isLoading,
        isValid,
        isDirty,
        register,
        errors,
        handleSubmit,
        onSubmit,
    } = useProfileWECreditCardAddNewCard()

    console.log({ errors });

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
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'Número inválido'
                                    },
                                    validate: {
                                        isNumber: (value) => {
                                            const number = Number(value)
                                            if (isNaN(number)) {
                                                return 'Número inválido'
                                            }
                                            return true
                                        }
                                    }
                                })}
                                inputProps={{
                                    maxLength: 16,
                                }}
                                error={!!errors?.number}
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
                                        validate: {
                                            isNumber: (value) => {
                                                const number = Number(value)
                                                if (isNaN(number)) {
                                                    return 'Número inválido'
                                                }
                                                return true
                                            }
                                        }
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
                                        },
                                        validate: {
                                            isNumber: (value) => {
                                                const number = Number(value)
                                                if (isNaN(number)) {
                                                    return 'Ano inválido'
                                                }
                                                return true
                                            }
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
                                fullWidth
                                variant="outlined"
                                {...register('cvv', {
                                    required: 'Esse campo é obrigatório',
                                    minLength: {
                                        value: 3,
                                        message: 'Código inválido'
                                    },
                                    maxLength: {
                                        value: 3,
                                        message: 'Código inválido'
                                    },
                                    validate: {
                                        isNumber: (value) => {
                                            const number = Number(value)
                                            if (isNaN(number)) {
                                                return 'Código inválido'
                                            }
                                            return true
                                        }
                                    }
                                })}
                                inputProps={{
                                    maxLength: 3,
                                }}
                                error={!!errors?.cvv}
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
                                    minLength: {
                                        value: 3,
                                        message: 'Nome inválido'
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: 'Nome muito grande'
                                    },
                                    validate: {
                                        isName: (value) => {
                                            const re = /^[a-z ,.'-]+$/i;
                                            return re.test(value) || 'Nome inválido';
                                        }
                                    }
                                })}
                                error={!!errors?.full_name}
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
                                    defaultValue={"VISA"}
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
                            disabled={isLoading || (!isValid && isDirty)}
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