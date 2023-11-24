import React from "react"
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { useLoginController } from "./hooks/useLoginWE";
import { Grid, Paper, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { routes } from "../../config/routes";
import ReCAPTCHA from 'react-google-recaptcha';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function LoginWE() {
    const { handleSubmit, register, errors, isLoading, setValue } = useLoginController()

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Grid container spacing={2} sx={{ maxWidth: '450px' }}>
                <Grid item xs={12} >
                    <Item sx={{ boxShadow: 5, p: 5 }}>
                        <Typography variant='h5' gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
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
                                    onChange={(token: string | null) => token && setValue('token', token)}
                                />
                                {
                                    errors?.token?.message &&
                                    <Typography variant='caption' color='error' gutterBottom>
                                        {errors?.token?.message}
                                    </Typography>
                                }
                            </div>

                            <div>
                                Não tem uma conta? <span><Link to={routes.REGISTER}>Criar cadastro</Link></span>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
};
