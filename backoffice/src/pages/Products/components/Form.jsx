import {
    Button,
    TextField,
    Box,
    DialogTitle,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/upload/UploadImage.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css"
import useWindowDimensions from "./hooks.js";

export default function Form(props) {
    const {
        formData,
        onFormUpdate,
        title,
        submitButtonText,
        onSubmit,
        editMode
    } = props

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
                        formData?.images.map((img, index) => {
                            return (
                                <img
                                    key={index}
                                    src={img}
                                    alt="product"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        margin: "10px"
                                    }}
                                />
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



                <TextField
                    id={"product-name-input"}
                    label="Nome do Produto"
                    type={"text"}
                    value={formData?.name || ""}
                    onChange={(e) => {
                        onFormUpdate("name", e.target.value)
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

                // TODO add validation
                // color="success"
                />

                <TextField
                    id={"product-name-price"}
                    label="Preco"
                    type={"number"}
                    value={formData?.price || ""}
                    onChange={(e) => {
                        onFormUpdate("price", e.target.value)
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
                />

                {
                    editMode &&
                    <div>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                                const accept = confirm(`Deseja mesmo deletar o produto '${formData?.name}'?`)
                                if (accept) {
                                    onSubmit("delete")
                                }
                            }}
                        >
                            Deletar
                        </Button>
                    </div>

                }

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
        </div>
    )
}

function Save({ editMode, loading, submitButtonText, onSubmit, setLoading }) {
    return (
        <div className="container">
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