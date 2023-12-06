import React from "react"
import { validateBrazilDocument } from "../../../../utils/document";
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import usePersonalInfo from "./hooks";
import RequiredDisclaimer from "../../../../components/Required/disclaimer";
import Required from "../../../../components/Required";
import FormField from "../FormField";
import Loading from "../../../../components/loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReCAPTCHA from 'react-google-recaptcha';

type PersonalInfoProps = {
    handleNext: () => void
    goHome: () => void
}

export default function PersonalInfo(props: PersonalInfoProps) {
    const {
        alreadySubmitted,
        isLoading,
        isValid,
        isDirty,
        register,
        setValue,
        errors,
        handleSubmit,
        onSubmit,
        genders,
        getValues,
    } = usePersonalInfo({ handleNext: props.handleNext })

    // Gambiarrinha
    const [haveToken, setHaveToken] = React.useState(false)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {
                genders ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <div>
                            <Typography variant='h5' gutterBottom>
                                Dados Pessoais
                            </Typography>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{
                                width: window.innerWidth > 600 ? '50%' : '90%',
                            }}
                        >
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
                                            },
                                            validate: {
                                                isSingleName: (value: string) => {
                                                    if (value.split(' ').length > 1) {
                                                        return 'Nome inválido'
                                                    }
                                                }
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
                                            },
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

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    marginTop: '1rem'
                                }}>
                                    <ReCAPTCHA
                                        hl="pt-BR"
                                        sitekey={import.meta.env.VITE_WE_CAPTCHA_KEY}
                                        onChange={(token: string | null) => {
                                            if (token) {
                                                setValue('token', token)
                                                setHaveToken(true)
                                            }
                                        }}
                                    />
                                    {
                                        errors?.token?.message &&
                                        <Typography variant='caption' color='error' gutterBottom>
                                            {errors?.token?.message}
                                        </Typography>
                                    }
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

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Button
                                            onClick={() => props.goHome()}
                                            variant="outlined"
                                            color="inherit"
                                            size={window.innerWidth > 600 ? 'large' : 'medium'}
                                        >
                                            <ArrowBackIosIcon sx={{
                                                fontSize: '16px',
                                                marginRight: '0.5rem',
                                            }} />

                                            Voltar
                                        </Button>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            size={window.innerWidth > 600 ? 'large' : 'medium'}
                                            disabled={
                                                (
                                                    () => {
                                                        if (alreadySubmitted) return false
                                                        if (!haveToken) return true
                                                        return (isLoading || (!isValid || !isDirty))
                                                    }
                                                )()
                                            }
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
        </div >
    )
};
