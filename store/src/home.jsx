import React from 'react';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchAuthentication } from './store/apps/apiAuth';
import { useDispatch, useSelector } from 'react-redux'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {
    const [loginForm, setLoginForm] = React.useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(fetchAuthentication({
            username: loginForm.username,
            password: loginForm.password
        }))
    }

    const loading = useSelector((state) => state.appReportLogin.loading)


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
                                onChange={(
                                    e,
                                ) =>
                                    setLoginForm(
                                        {
                                            ...loginForm,
                                            username:
                                                e
                                                    .target
                                                    .value,
                                        },
                                    )
                                }
                            />
                            <TextField
                                label="Senha"
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                type="password"
                                required
                                size='small'
                                onChange={(
                                    e,
                                ) =>
                                    setLoginForm(
                                        {
                                            ...loginForm,
                                            password:
                                                e
                                                    .target
                                                    .value,
                                        },
                                    )
                                }
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                proge
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;