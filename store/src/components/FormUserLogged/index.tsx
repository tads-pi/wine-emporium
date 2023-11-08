import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLoggedUserController } from './useLoggedUserController';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function FormUserLogged() {
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

    const [gambiarra, setGambiarra] = useState({
        document: '',
        email: '',
        name: '',
        birthDate: '',
        gender: ''
    })
    useEffect(() => {
        // TODO fix here
        // authService.getuserdata().then(setGambiarra)
    }, [])

    // crazy gambiarra
    if (!gambiarra.name) {
        return null
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', width: '50%' }}>
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
                                    defaultValue={gambiarra.name}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    size='small'
                                    {...register('name')}
                                    helperText={errors?.name?.message}
                                    error={!!errors.document}
                                />


                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                    label="CPF"
                                    defaultValue={gambiarra.document}
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


                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                    label="E-mail"
                                    defaultValue={gambiarra.email}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    size='small'
                                    {...register('email')}
                                    helperText={errors?.email?.message}
                                    error={!!errors.email}
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
                                    defaultValue={gambiarra.birthDate}
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
                                            mask: '99/99/9999',
                                        },
                                    }}
                                />
                            </div>
                            <div>
                                <Controller
                                    control={methods.control}
                                    name='gender'
                                    defaultValue={gambiarra.gender.toLowerCase().replace('/', '')}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...register('gender')}
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                                            <FormControlLabel value="feminino" control={<Radio />} label="Feminino" />
                                            <FormControlLabel value="na" control={<Radio />} label="Outros" />
                                        </RadioGroup>
                                    )}
                                />
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Atualizando seus dados...' : 'Atualizar meus dados'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}