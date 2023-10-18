import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputMask from 'react-input-mask';

import { useCreateUserController } from './useCreateUserController';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function FormCreateUser() {
    const { handleSubmit, register, errors, isLoading } = useCreateUserController()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Grid container spacing={2} sx={{ maxWidth: '750px' }}>
                <Grid item xs={12} >
                    <Item sx={{ boxShadow: 5, p: 5 }}>
                        <Typography variant='h5' gutterBottom>
                            Cadastro
                        </Typography>

                        <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                    label="Nome Completo"
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
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    size='small'
                                    {...register('email')}
                                    helperText={errors?.email?.message}
                                    error={!!errors.email}
                                />
                                 <TextField
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
                                />
                                
                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
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
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Cadastrando...' : 'Criar cadastro'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}