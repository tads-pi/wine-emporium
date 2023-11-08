import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Button, Typography, FormControl, SelectChangeEvent, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLoggedAddressController } from './useLoggedAddressController';
import { useForm } from 'react-hook-form';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function FormUserAddress() {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const { handleSubmit, register, errors, isLoading, handleSubmitMeiosDuvidosos } = useLoggedAddressController()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // todo evitar any
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const [value, setValue] = React.useState('');
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const methods = useForm();

    const [gambiarra, setGambiarra] = useState({
        document: '',
        email: '',
        name: '',
        birthDate: '',
        address: [] as any
    })
    // useEffect(() => {
    // TODO arrumar essa rota aqui
    //     authService.getuserdata().then(setGambiarra)
    // }, [])

    // crazy gambiarra
    if (!gambiarra.name) {
        return null
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', width: '50%' }}>
            <Grid container spacing={2} sx={{ maxWidth: '750px' }}>
                <Grid item xs={12} >
                    <Item sx={{ boxShadow: 5, p: 5 }}>
                        <Typography variant='h5' gutterBottom>
                            Endereço do usuário
                        </Typography>

                        <form >

                            <div style={{ display: 'flex', gap: 15 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Endereço</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={gambiarra.address[0].id}
                                        label="Endereço"
                                        onChange={handleChangeSelect}
                                    >
                                        {gambiarra.address.map((address: any) =>
                                        (<MenuItem value={address.id}>
                                            {address.logradouro}, {address.cidade} - {address.cep}
                                            {/* {address.logradouro, address.cidade} */}
                                        </MenuItem>))}
                                    </Select>
                                </FormControl>
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                type="submit"
                                style={{ marginTop: '2rem' }}
                                disabled={isLoading}
                                onClick={(e: any) => {
                                    e.preventDefault()
                                    handleSubmitMeiosDuvidosos(gambiarra.address[0].id)
                                }}
                            >
                                {isLoading ? 'Atualizando seu endereço...' : 'Atualizar meu endereço'}
                            </Button>
                        </form>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}