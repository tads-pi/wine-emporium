import React, { useEffect, useState } from 'react';
import { Paper, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Client, Gender } from '../../../../zustand/types';
import Grid from '@mui/material/Grid';
import InputMask from 'react-input-mask';
import useStore from '../../../../zustand/store';
import Loading from '../../../../components/loading';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProfileWEUserData() {
    const { authApi, genderApi } = useStore()

    const [clientData, setClientData] = useState<Client | null>(null)
    const [genders, setGenders] = useState<Gender[]>([])
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

                                <form>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <TextField
                                            label="Nome Completo"
                                            defaultValue={clientData.name}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'
                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    name: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <TextField
                                            label="E-mail"
                                            defaultValue={clientData.email}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'

                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    email: e.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            label="Data de Nascimento"
                                            defaultValue={clientData.birthDate}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            size='small'
                                            InputProps={{
                                                inputComponent: InputMask as any,
                                                inputProps: {
                                                    mask: '9999/99/99',
                                                },
                                            }}

                                            onChange={(e) => {
                                                setClientData({
                                                    ...clientData,
                                                    birthDate: new Date(dayjs(e.target.value).format('YYYY-MM-DD'))
                                                })
                                            }}
                                        />
                                    </div>
                                    <div>

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
                                        onClick={() => updateClientData()}
                                    >
                                        Atualizar meus dados
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