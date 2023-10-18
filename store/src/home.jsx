import React from 'react';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStore } from './zustand-store/index.example';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {
    const [loginForm, setLoginForm] = React.useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    // const { user, isLoading, login } = useStore(store => {
    //     return {
    //       user: store.user,
    //       isLoading: store.isLoading,
    //       login: store.login
    //     }
    // })

    const { mutate, isLoading } = useLogin()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (e) => {
        e.preventDefault()
        // login({
        //     email: loginForm.email,
        //     password: loginForm.password
        // })
        // .then((res) => {
        //     if(res.access_token) {
                navigate('/mercado')    
                 localStorage.setItem('token', "mock_token")
        //     }
        // })
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Grid container spacing={2} sx={{ maxWidth: '450px' }}>
                <Grid item xs={12} >
                    <Item sx={{ boxShadow: 5, p: 5 }}>
                        <Typography variant='h5' gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={onSubmit}>
                            <TextField
                                label="E-mail"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                                size='small'
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
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
                            />
                            <div>
                                Não tem uma conta? <span><Link to="criar-cadastro">Criar cadastro</Link></span>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                disabled={isLoading}
                                onClick={() => mutate(loginForm)}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
