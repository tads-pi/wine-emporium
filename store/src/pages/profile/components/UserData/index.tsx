import React from 'react';
import ProfileWEContainer from '../Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import useUserData from './hooks';

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
                    justifyContent: 'center',
                    alignItems: 'center',

                    width: '100%',
                    height: '100%',
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',

                                width: '100%',
                                gap: '1rem',
                            }}
                        >
                            <div>
                                <InputLabel id="name-label">Nome</InputLabel>
                                <TextField
                                    {...register('name')}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
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

                            <Button
                                type="submit"
                                variant="contained"
                                color='primary'
                                disabled={!isValid}
                            >
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            }
        </ProfileWEContainer>
    )
}