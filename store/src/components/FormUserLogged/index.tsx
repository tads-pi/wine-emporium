import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLoggedUserController } from './useLoggedUserController';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import useStore from '../../zustand/store';
import { Client, Gender, Update } from '../../zustand/types';
import Loading from '../loading';
import createGenderSlice from '../../zustand/slices/genderSlice';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function FormUserLogged() {
    const { authApi, genderApi } = useStore()

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const { handleSubmit, register, errors, isLoading } = useLoggedUserController()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const methods = useForm();

    const [clientData, setClientData] = useState<Client | null>(null)
    const [genders, setGenders] = useState<Gender[]>([])
    const [password, setPassword] = useState<string>('')
    useEffect(() => {
        authApi.getMe().then((client) => {
            setClientData(client)
        })
        genderApi.getGenderOptions().then(setGenders)
    }, [])

    function updateClientData() {
        if (clientData) {
            authApi.update({
                name: clientData.name,
                birthDate: clientData.birthDate,
                genderId: clientData.genderId,
                password: password,
            })
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', width: '50%' }}>
            {
                clientData ?
                    <Grid container spacing={2} sx={{ maxWidth: '750px' }}>
                        <Grid item xs={12} >
                            <Item sx={{ boxShadow: 5, p: 5 }}>
                                <Typography variant='h5' gutterBottom>
                                    Perfil do usuário
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <TextField
                                            label="Nome Completo"
                                            defaultValue={clientData.name}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'
                                            {...register('name')}
                                            helperText={errors?.name?.message}
                                            error={!!errors.document}
                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    name: e.target.value
                                                })
                                            }}
                                        />


                                    </div>
                                    {/* <div style={{ display: 'flex', gap: 15 }}>
                                        <TextField
                                            label="CPF"
                                            defaultValue={clientData.document}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            error={!!errors.document}
                                            size='small'
                                            helperText={errors.document?.message}
                                            {...register('document')}
                                            InputProps={{
                                                inputComponent: InputMask as any,
                                                inputProps: {
                                                    mask: '999.999.999-99',
                                                },
                                            }}
                                        />


                                    </div> */}
                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <TextField
                                            label="E-mail"
                                            defaultValue={clientData.email}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'
                                            {...register('email')}
                                            helperText={errors?.email?.message}
                                            error={!!errors.email}

                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    email: e.target.value
                                                })
                                            }}
                                        />
                                        {/* <TextField
                                    label="Senha"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    type={showPassword ? 'text' : 'password'} // Mostra ou esconde a senha com base no estado showPassword
                                    size='small'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register('password')}
                                    helperText={errors?.password?.message}
                                    error={!!errors.password}
                                /> */}

                                    </div>
                                    {/* <div style={{ display: 'flex', gap: 15 }}>
                            <TextField
                                    label="Grupo"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    size='small'
                                    {...register('group')}
                                    helperText={errors?.group?.message}
                                    error={!!errors.group}
                                />
                            </div> */}
                                    <div>
                                        <TextField
                                            label="Data de Nascimento"
                                            defaultValue={clientData.birthDate}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'
                                            {...register('birthdate')}
                                            error={!!errors.birthdate}
                                            helperText={errors.birthdate?.message}
                                            InputProps={{
                                                inputComponent: InputMask as any,
                                                inputProps: {
                                                    mask: '9999/99/99',
                                                },
                                            }}

                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    birthDate: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div>
                                        {/* <Controller
                                            control={methods.control}
                                            name='genderId'
                                            render={({ field }) => (
                                                <RadioGroup
                                                    {...register('genderId')}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    {
                                                        genders.length > 0 &&
                                                        genders.map((g) => {
                                                            return (
                                                                <FormControlLabel
                                                                    key={g.id}
                                                                    value={g.id}
                                                                    control={< Radio />}
                                                                    label={g.name}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </RadioGroup>
                                            )}
                                        /> */}

                                        {
                                            genders &&
                                            <Select
                                                value={clientData.genderId}
                                                defaultValue={clientData.genderId}
                                                onChange={(e) => {
                                                    setClientData({
                                                        ...clientData,
                                                        genderId: e.target.value as string
                                                    })
                                                }}
                                            >
                                                {
                                                    genders.map(({ id, name }) => (
                                                        <MenuItem key={id} value={id}>
                                                            {name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        }

                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        style={{ marginTop: '2rem' }}
                                        disabled={isLoading}
                                        onClick={() => updateClientData()}
                                    >
                                        {isLoading ? 'Atualizando seus dados...' : 'Atualizar meus dados'}
                                    </Button>
                                </form>
                            </Item>
                        </Grid>
                    </Grid>

                    : <Loading />
            }
        </div>
    )
}