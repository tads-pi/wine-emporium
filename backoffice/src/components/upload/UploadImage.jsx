import ImageUploading from "react-images-uploading";
// import useUploadImage from "./hooks"
import { useState } from "react";
import "./style.css"

export default function UploadImage({ onSubmit, imageHook }) {
    const [images, setImages] = useState([]);
    const maxNumber = 10;

    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
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
                    const onImageRemoveAll = action.onImageRemoveAll;
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

                            <button onClick={onImageRemoveAll}>Deletar todas as imagens</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image["data_url"]} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Atualizar</button>
                                        <button onClick={() => onImageRemove(index)}>Deletar</button>
                                    </div>
                                </div>
                            ))}
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
