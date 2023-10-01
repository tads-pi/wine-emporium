import {
    Button,
    TextField,
    Box,
    DialogTitle,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks.js";
import "./styles.css"

export default function Form(props) {
    const {
        formData,
        onFormUpdate,
        title,
        submitButtonText,
        onSubmit,
        editMode
    } = props

    const [validation, setValidation] = useState({
        name: "",
        email: "",
        document: "",
        password: "",
        passwordConfirmation: "",
        group: "",
    })
    const [imageData, setImageData] = useState()
    const [loading, setLoading] = useState(false)
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (imageData) {
            onFormUpdate("image", imageData)
        }
    }, [imageData])

    function isMobile() {
        return width < 1024
    }

    const groups = [
        "ESTOQUISTA",
        "ADMINISTRADOR",
    ]

    useEffect(() => {
        onFormUpdate("group", groups[0])
    }, [])

    return (
        <div className="container form__container">

            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
            >
                <div className="container">
                    <DialogTitle>{title || "Salvar Usuário"}</DialogTitle>
                </div>

                <TextField
                    id={"user-input"}
                    label="Nome do Usuário"
                    type={"text"}
                    value={formData?.name || ""}
                    onChange={(e) => {
                        onFormUpdate("name", e.target.value)
                    }}

                    error={!!validation.name}
                    helperText={validation.name}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                name: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                name: ""
                            })
                        }
                    }}
                />

                <TextField
                    id={"user-email"}
                    label="e-mail"
                    type={"email"}
                    value={formData?.email || ""}
                    onChange={(e) => {
                        onFormUpdate("email", e.target.value)
                    }}

                    error={!!validation.email}
                    helperText={validation.email}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                email: "Campo obrigatório"
                            })
                        } else {
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            const isValidEmail = emailRegex.test(e.target.value)
                            if (isValidEmail) {
                                setValidation({
                                    ...validation,
                                    email: ""
                                })
                                return
                            }

                            setValidation({
                                ...validation,
                                email: "E-mail inválido"
                            })
                        }
                    }}
                />

                <TextField
                    id={"user-document"}
                    label="Documento"
                    type={"text"}
                    value={formData?.document || ""}
                    onChange={(e) => {
                        onFormUpdate("document", e.target.value)
                    }}

                    error={!!validation.document}
                    helperText={validation.document}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                document: "Campo obrigatório"
                            })
                        } else {
                            // TODO enhance this validation adding field mask
                            const isValidDocument = e.target.value.length === 11
                            if (isValidDocument) {
                                setValidation({
                                    ...validation,
                                    document: ""
                                })
                                return
                            }

                            setValidation({
                                ...validation,
                                document: "Documento inválido"
                            })
                        }
                    }}
                />

                <TextField
                    id={"user-password"}
                    label="Senha"
                    type={"password"}
                    value={formData?.password || ""}
                    onChange={(e) => {
                        onFormUpdate("password", e.target.value)
                    }}

                    error={!!validation.password}
                    helperText={validation.password}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                password: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                password: ""
                            })
                        }
                    }}
                />

                <TextField
                    id={"user-password-confirmation"}
                    label="Confirmar Senha"
                    type={"password"}
                    value={formData?.passwordConfirmation || ""}
                    onChange={(e) => {
                        onFormUpdate("passwordConfirmation", e.target.value)
                    }}

                    error={!!validation.passwordConfirmation}
                    helperText={validation.passwordConfirmation}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                passwordConfirmation: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                passwordConfirmation: ""
                            })
                        }
                    }}
                />

                <div className="form__group-wrapper">
                    <InputLabel id="user-group">Grupo</InputLabel>
                    {
                        groups &&
                        <Select
                            value={formData?.group}
                            onChange={(e) => {
                                onFormUpdate("group", e.target.value)
                            }}
                        >
                            {
                                groups.map((value, i) => (
                                    <MenuItem key={i} value={value}>
                                        {value}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    }
                </div>

                {
                    !isMobile() &&
                    <Save
                        editMode={editMode}
                        loading={loading}
                        submitButtonText={submitButtonText}
                        onSubmit={onSubmit}
                        setLoading={setLoading}
                    />
                }

            </Box>

            {
                isMobile() &&
                <Save
                    editMode={editMode}
                    loading={loading}
                    submitButtonText={submitButtonText}
                    onSubmit={onSubmit}
                    setLoading={setLoading}
                />
            }
        </div>
    )
}

function Save({ editMode, loading, submitButtonText, onSubmit, setLoading }) {
    return (
        <div className="form__button-wrapper">
            {
                loading
                    ?
                    <LoadingButton
                        loading
                        variant="outlined"
                    >
                        {submitButtonText || "Salvar"}
                    </LoadingButton>
                    :
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => {
                            setLoading(false) // todo
                            onSubmit(editMode ? "update" : "save")
                        }}
                    >
                        {submitButtonText || "Salvar"}
                    </Button>
            }
        </div>
    )
}