import { InputLabel, TextField } from "@mui/material";
import React from "react";
import Required from "../../../../components/Required";

type FormField = {
    name: string
    label: string
    required?: boolean

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
            />
        </div>
    )
};
