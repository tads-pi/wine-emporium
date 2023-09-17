import ImageUploading from "react-images-uploading";
// import useUploadImage from "./hooks"
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css"

export default function UploadImage({ onSubmit, imageHook }) {
    const [images, setImages] = useState([]);
    const maxNumber = 10;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex);
        setImages(imageList);
        if (imageHook) {
            imageHook(imageList)
        }
    };

    const _onSubmit = async (e) => {
        e.preventDefault()
        await onSubmit(images)
    }

    return (
        <form onSubmit={_onSubmit}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {(action) => {
                    const imageList = action.imageList;
                    const onImageUpload = action.onImageUpload;
                    // const onImageRemoveAll = action.onImageRemoveAll;
                    const onImageUpdate = action.onImageUpdate;
                    const onImageRemove = action.onImageRemove;
                    const isDragging = action.isDragging;
                    const dragProps = action.dragProps;

                    return (
                        <div className="upload-image__container">
                            <div
                                className="upload-image__drag-box square"
                                style={isDragging ? {
                                    backgroundColor: "lightgray"
                                } : undefined}

                                onClick={onImageUpload}
                                {...dragProps}
                            />

                            {/* <button onClick={onImageRemoveAll}>Deletar todas as imagens</button> */}
                            <div
                                className="upload-image__scroll"
                            >
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img className="image" src={image["data_url"]} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <IconButton
                                                aria-label="delete"
                                                size="large"
                                                onClick={() => onImageUpdate(index)}
                                            >
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                size="large"
                                                onClick={() => onImageRemove(index)}
                                            >
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }}
            </ImageUploading >

            {
                imageHook === null &&
                <button type="submit">Enviar</button>
            }
        </form >
    );
}
