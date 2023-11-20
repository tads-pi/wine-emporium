import React from "react";
import useLoginInfo from "./hooks";
import { Button, Typography } from "@mui/material";
import FormField from "../FormField";
import RequiredDisclaimer from "../../../../components/Required/disclaimer";

type LoginInfoProps = {
    handleNext: () => void
}

export default function LoginInfo(props: LoginInfoProps) {
    const {
        isLoading,
        isValid,
        isDirty,
        register,
        getValues,
        errors,
        handleSubmit,
        onSubmit,
    } = useLoginInfo({ handleNext: props.handleNext })

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <div>
                    <Typography variant='h5' gutterBottom>
                        Dados de Acesso
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
                            name={"email"}
                            label={"E-mail"}
                            formHook={{
                                register,
                                errors,
                                registerProps: {
                                    required: 'Campo obrigatório',
                                    minLength: {
                                        value: 3,
                                        message: 'email inválido',
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: 'email inválido',
                                    },
                                    validate: {
                                        isEmail: (value: string) => {
                                            const re = /\S+@\S+\.\S+/;
                                            return re.test(value) || 'email inválido';
                                        }
                                    }
                                },
                            }}
                            required
                        />

                        <FormField
                            name={"password"}
                            label={"Senha"}
                            formHook={{
                                register,
                                errors,
                                registerProps: {
                                    required: 'Campo obrigatório',
                                    minLength: {
                                        value: 8,
                                        message: 'senha inválida',
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: 'senha inválida',
                                    },
                                },
                            }}
                            password
                            required
                        />

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '0.8rem',
                            color: '#707070', // roubei do mui com color picker
                        }}>
                            <p style={{
                                margin: '0',
                            }}>
                                Sua senha deve:
                            </p>
                            <ul style={{
                                margin: '0',
                            }}>
                                <li>Ter no mínimo 8 caracteres</li>
                                <li>Ter no máximo 64 caracteres</li>
                            </ul>
                        </div>

                        <FormField
                            name={"confirmPassword"}
                            label={"Confirme sua Senha"}
                            formHook={{
                                register,
                                errors,
                                registerProps: {
                                    required: 'Campo obrigatório',
                                    minLength: {
                                        value: 8,
                                        message: 'senha inválida',
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: 'senha inválida',
                                    },
                                    validate: {
                                        matchesPreviousPassword: (value: string) => {
                                            const { password } = getValues();
                                            return password === value || 'senhas não conferem';
                                        }
                                    }
                                },
                            }}
                            password
                            required
                        />
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
                                    size="large"
                                    disabled={isLoading || (!isValid || !isDirty)}
                                >
                                    {isLoading ? 'Carregando...' : 'Contiuar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
};
