import React from "react"
import { validateBrazilDocument } from "../../../../utils/document";
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import usePersonalInfo from "./hooks";
import useRegisterWEAutofill from "../../hooks/useRegisterWEAutofill";
import RequiredDisclaimer from "../../../../components/Required/disclaimer";
import Required from "../../../../components/Required";
import FormField from "../FormField";
import Loading from "../../../../components/loading";

type PersonalInfoProps = {
    handleNext: () => void
}

export default function PersonalInfo(props: PersonalInfoProps) {
    const {
        isLoading,
        isValid,
        isDirty,
        register,
        setValue,
        errors,
        handleSubmit,
        onSubmit,
    } = usePersonalInfo({ handleNext: props.handleNext })

    const {
        genders,
    } = useRegisterWEAutofill()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {
                genders ?
                    <div>
                        <Typography variant='h5' gutterBottom>
                            Dados Pessoais
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}>
                                <FormField
                                    name={"firstName"}
                                    label={"Nome"}
                                    formHook={{
                                        register,
                                        errors,
                                        registerProps: {
                                            required: 'Campo obrigatório',
                                            minLength: {
                                                value: 3,
                                                message: 'Nome inválido'
                                            },
                                            maxLength: {
                                                value: 64,
                                                message: 'Nome inválido'
                                            }
                                        },
                                    }}
                                    required
                                />

                                <FormField
                                    name={"lastName"}
                                    label={"Sobrenome"}
                                    formHook={{
                                        register,
                                        errors,
                                        registerProps: {
                                            required: 'Campo obrigatório',
                                            minLength: {
                                                value: 3,
                                                message: 'Nome inválido'
                                            },
                                            maxLength: {
                                                value: 64,
                                                message: 'Nome inválido'
                                            }
                                        },
                                    }}
                                    required
                                />

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <InputLabel id={`document-label`}>
                                        CPF<Required />
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        size='small'
                                        {...register('document', {
                                            required: 'Campo obrigatório',
                                            minLength: {
                                                value: 11,
                                                message: 'CPF inválido'
                                            },
                                            maxLength: {
                                                value: 11,
                                                message: 'CPF inválido'
                                            },
                                            validate: {
                                                isNumber: (value) => {
                                                    if (isNaN(Number(value))) {
                                                        return 'CPF inválido'
                                                    }
                                                },
                                                isBRCPF: (value) => {
                                                    if (!validateBrazilDocument(value)) {
                                                        return 'CPF inválido'
                                                    }
                                                }
                                            }
                                        })}
                                        helperText={errors?.document?.message}
                                        error={!!errors?.document}
                                        FormHelperTextProps={{
                                            style: {
                                                color: 'red'
                                            }
                                        }}

                                        style={{
                                            margin: 0,
                                        }}
                                    />
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <InputLabel id="birth-date-label">
                                        Data de Nascimento<Required />
                                    </InputLabel>
                                    <TextField
                                        type="date"
                                        lang='pt-BR'
                                        {...register('birthDate', {
                                            required: 'Campo obrigatório',
                                            validate: {
                                                isDate: (value) => {
                                                    if (isNaN(Date.parse(value))) {
                                                        return 'Data inválida'
                                                    }
                                                }
                                            }
                                        })}
                                        error={!!errors.birthDate}
                                        helperText={errors.birthDate?.message}
                                        sx={{ width: '100%' }}
                                        FormHelperTextProps={{
                                            sx: {
                                                color: 'red',
                                            }
                                        }}
                                    />
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <InputLabel id="gender-label">
                                        Gênero<Required />
                                    </InputLabel>
                                    <Select
                                        defaultValue={genders[0].id}
                                        error={!!errors.genderId}
                                        onChange={(e) => {
                                            const genderId = e.target.value as string
                                            setValue('genderId', genderId)
                                        }}
                                        sx={{ width: '100%' }}
                                    >
                                        {genders && genders.map((gender) => (
                                            <MenuItem key={gender.id} value={gender.id}>
                                                {gender.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>

                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                marginTop: '1rem',
                            }}>
                                <div>
                                    <RequiredDisclaimer />
                                </div>

                                <div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            disabled={isLoading || (!isValid || !isDirty)}
                                        >
                                            {isLoading ? 'Carregando...' : 'Contiuar'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    : <Loading />
            }
        </div>
    )
};
