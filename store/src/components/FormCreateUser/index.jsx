import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form'

import { userLoginFormSchema } from '../../utils/schema';
import { useCreateUser } from '../../hooks/useCreateUserMutate';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function FormCreateUser() {
    const [loginForm, setLoginForm] = React.useState({
        name: '',
        document: '',
        email: '',
        password: '',
        group: ''
    });
    const { mutate, isLoading } = useCreateUser()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    
    // Função para aplicar a máscara de CPF
    const formatCPF = (value) => {
        // Remove caracteres não numéricos
        const cleanedValue = value.replace(/\D/g, '');

        // Aplica a máscara de CPF (###.###.###-##)
        const formattedValue = cleanedValue.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
        );

        return formattedValue;
    };

    const handleCPFChange = (e) => {
        const formattedCPF = formatCPF(e.target.value);
        setLoginForm({ ...loginForm, document: formattedCPF });
    };


    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: loginForm.name,
            document: loginForm.document,
            email: loginForm.email,
            password: loginForm.password,
            group: loginForm.group
        }
        mutate(data)
    };


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(userLoginFormSchema)
    })


    const handleValuesPassword = (message) => {
        switch (message) {
            case 'Senha fraca':
                return 'error'
            case 'Senha média':
                return 'warning'
            case 'Senha forte':
                return 'success'
        }
    }

    const validateForm = () => {
        const validateUser = Object.values(loginForm).includes('')

        return validateUser
    }
    
    return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Grid container spacing={2} sx={{ maxWidth: '750px' }}>
                <Grid item xs={12} >
                    <Item sx={{ boxShadow: 5, p: 5 }}>
                        <Typography variant='h5' gutterBottom>
                            Cadastro
                        </Typography>
                        <form onSubmit={onSubmit}>
                        <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                    type='text'
                                    label="Nome Completo"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size='small'
                                    onChange={(e) => {
                                        setLoginForm({ ...loginForm, name: e.target.value })
                                    }}
                                    // {...register('name')}
                                    // helperText={errors?.name?.message}
                                    // color={errors?.name?.message ? 'error' : undefined}
                                />
                                
                                
                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                     label="CPF"
                                     fullWidth
                                     variant="outlined"
                                     margin="normal"
                                     required
                                     size='small'
                                     inputProps={{maxLength: 14}}
                                     value={loginForm.document} // Usar o valor formatado do estado
                                     onChange={handleCPFChange} // Aplicar a máscara no evento onChange
                                    // {...register('document')}
                                    // helperText={errors?.document?.message}
                                    // color={errors?.document?.message ? 'error' : undefined}
                                />
                                
                                
                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
                                <TextField
                                    type='email'
                                    label="E-mail"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size='small'
                                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    // {...register('email')}
                                    // helperText={errors?.email?.message}
                                    // color={errors?.email?.message ? 'error' : undefined}
                                />
                                 <TextField
                                    label="Senha"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    type={showPassword ? 'text' : 'password'} // Mostra ou esconde a senha com base no estado showPassword
                                    required
                                    size='small'
                                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
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
                                    // {...register('password')}
                                    // helperText={errors?.password?.message}
                                    // color={handleValuesPassword(errors?.password?.message)}
                                />
                                
                            </div>
                            <div style={{ display: 'flex', gap: 15 }}>
                            <TextField
                                    type='text'
                                    label="Grupo"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    size='small'
                                    onChange={(e) => setLoginForm({ ...loginForm, group: e.target.value })}
                                    // {...register('group')}
                                    // helperText={errors?.group?.message}
                                    // color={errors?.group?.message ? 'error' : undefined}
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