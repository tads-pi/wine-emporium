import React from 'react';
import ProfileWEContainer from '../Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import useUserData from './hooks';
import { Typography } from '@mui/material';

export default function ProfileWEUserData() {
    const {
        userData,
        updateUserData,
        genders,
        isLoading,
        isValid,
        register,
        errors,
        setValue,
        handleSubmit,
        onSubmit,
    } = useUserData()

    return (
        <ProfileWEContainer
            isLoading={isLoading}
            shouldShowLoading={!(genders && userData)}
        >
            {
                genders && userData &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                }}>
                    <div style={{ paddingBottom: '1rem' }}>
                        <h2>Editar Dados Pessoais</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',

                                maxWidth: 'min(40ch, 100%)',
                                gap: '1rem',
                            }}
                        >
                            <div>
                                <InputLabel id="firstName-label">Nome</InputLabel>
                                <TextField
                                    {...register('firstName', {
                                        required: 'Campo obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Seu nome deve ter no mínimo 3 caracteres'
                                        },
                                        maxLength: {
                                            value: 64,
                                            message: 'Seu nome deve ter no máximo 64 caracteres'
                                        },
                                    })}
                                    error={!!errors?.firstName}
                                    helperText={errors?.firstName?.message}
                                    FormHelperTextProps={{
                                        sx: {
                                            color: 'red',
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <InputLabel id="lastName-label">Sobrenome</InputLabel>
                                <TextField
                                    {...register('lastName', {
                                        required: 'Campo obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Seu sobrenome deve ter no mínimo 3 caracteres'
                                        },
                                        maxLength: {
                                            value: 64,
                                            message: 'Seu sobrenome deve ter no máximo 64 caracteres'
                                        },
                                    })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    FormHelperTextProps={{
                                        sx: {
                                            color: 'red',
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <InputLabel id="birth-date-label">Data de Nascimento</InputLabel>
                                <TextField
                                    type="date"
                                    lang='pt-BR'
                                    {...register('birthDate')}
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

                            <div>
                                <InputLabel id="gender-label">Gênero</InputLabel>
                                <Select
                                    error={!!errors.genderId}
                                    value={userData.genderId}
                                    onChange={(e) => {
                                        const selectedId = e.target.value as string;
                                        setValue('genderId', selectedId);
                                        updateUserData('genderId', selectedId)
                                    }}
                                    sx={{ width: '100%' }}
                                >
                                    {genders.map((gender) => (
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
                                marginTop: '1rem',
                            }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color='success'
                                    disabled={!isValid}
                                >
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </ProfileWEContainer>
    )
}