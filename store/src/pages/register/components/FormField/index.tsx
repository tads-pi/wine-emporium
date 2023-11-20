import { IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import Required from "../../../../components/Required";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type FormField = {
    name: string
    label: string
    required?: boolean
    password?: boolean

    formHook: {
        register: any
        registerProps: any
        errors: any
    }
}

export default function FormField(props: FormField) {
    const {
        name,
        label,
        required,
    } = props

    const {
        register,
        registerProps,
        errors,
    } = props.formHook

    const [showPassword, setShowPassword] = useState(false);
    function handleClickShowPassword() {
        setShowPassword((show) => !show);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            <InputLabel id={`${name}-label`}>
                {label}
                {
                    required && <Required />
                }
            </InputLabel>
            <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                size='small'
                {...register(name, {
                    ...registerProps
                })}
                helperText={errors?.[name]?.message}
                error={!!errors?.[name]}
                FormHelperTextProps={{
                    style: {
                        color: 'red'
                    }
                }}
                style={{
                    margin: 0,
                }}

                type={!props.password ? 'text' : (showPassword ? 'text' : 'password')}
                InputProps={
                    props.password ?
                        {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                        : {}}
            />
        </div>
    )
};
