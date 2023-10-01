import {
    Button,
    TextField,
    Box,
    DialogTitle,
    Rating,
    InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/upload/UploadImage.jsx";
import useWindowDimensions from "./hooks.js";
import "./styles.css"
import ImageHandlerWE from "../../../components/ImageHandlerWE/ImageHandlerWE.jsx";

export default function Form(props) {
    const {
        formData,
        onFormUpdate,
        title,
        submitButtonText,
        onSubmit,
        editMode,
        deleteImage,
        markImage,
    } = props

    const [validation, setValidation] = useState({
        ratings: 0,
        name: "",
        description: "",
        price: "",
        stock: "",
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

    return (
        <div className="container form__container">
            {
                editMode &&
                <Box>
                    {
                        // TODO getimage base64 and send back to api using the component
                        formData?.images &&
                        formData?.images.map(({ key, url }, index) => {
                            return (
                                <div
                                    key={index}
                                >
                                    <ImageHandlerWE
                                        src={url}
                                        identifier={key}
                                        alt="product"

                                        marked={true}
                                        deleteImageHook={(imageID) => {
                                            const confirmation = window.confirm("Deseja mesmo deletar essa imagem?")
                                            if (confirmation) {
                                                deleteImage(imageID)
                                            }
                                        }}
                                        markImageHook={(imageID) => {
                                            const confirmation = window.confirm("Deseja mesmo marcar essa imagem como principal?")
                                            if (confirmation) {
                                                markImage(imageID)
                                            }
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </Box>
            }
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
            >
                <div className="container">
                    <DialogTitle>{title || "Salvar Produto"}</DialogTitle>
                </div>

                <div className="form__ratings-wrapper">
                    <InputLabel
                        id="product-ratings"
                        required

                        error={!!validation.ratings}
                    >
                        Avaliação
                    </InputLabel>
                    <Rating
                        name="product-ratings-input"
                        value={formData?.ratings ? Number(formData.ratings) : 0.0}
                        precision={0.5}
                        size="large"
                        onChange={(e, newValue) => {
                            onFormUpdate("ratings", newValue);
                        }}
                    />
                </div>

                <TextField
                    id={"product-name-input"}
                    label="Nome do Produto"
                    type={"text"}
                    value={formData?.name || ""}
                    onChange={(e) => {
                        onFormUpdate("name", e.target.value)
                    }}
                    required

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
                    id={"product-name-descricao"}
                    label="Descricao"
                    type={"text"}
                    value={formData?.description || ""}
                    onChange={(e) => {
                        onFormUpdate("description", e.target.value)
                    }}
                    multiline
                    rows={4}
                    required

                    error={!!validation.description}
                    helperText={validation.description}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                description: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                description: ""
                            })
                        }
                    }}
                />

                <TextField
                    id={"product-name-price"}
                    label="Preco"
                    type={"number"}
                    value={formData?.price || ""}
                    onChange={(e) => {
                        onFormUpdate("price", e.target.value)
                    }}
                    required

                    error={!!validation.price}
                    helperText={validation.price}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                price: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                price: ""
                            })
                        }
                    }}
                />

                <TextField
                    id={"product-name-stock"}
                    label="Estoque"
                    type={"number"}
                    value={formData?.stock || ""}
                    onChange={(e) => {
                        onFormUpdate("stock", e.target.value)
                    }}
                    required

                    error={!!validation.stock}
                    helperText={validation.stock}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setValidation({
                                ...validation,
                                stock: "Campo obrigatório"
                            })
                        } else {
                            setValidation({
                                ...validation,
                                stock: ""
                            })
                        }
                    }}
                />

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

            <Box
                component="div"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    height: "100%",
                }}
                noValidate
                autoComplete="off"
            >
                <div className="form__upload-image">
                    <UploadImage
                        imageHook={setImageData}
                    />
                </div>
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
        </div >
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