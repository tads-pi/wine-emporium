import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import "./styles.css"

export default function ImageHandlerWE({ marked, src, identifier, alt, deleteImageHook, markImageHook }) {

    function DeleteImage() {
        deleteImageHook(identifier || src)
    }

    function MarkImage() {
        markImageHook(identifier || src)
    }

    return (
        <div className="image-handler__container">
            <div className='image-handler__buttons-wrapper'>
                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={MarkImage}
                >
                    {
                        marked
                            ? <StarIcon color="warning" />
                            : <StarBorderIcon />
                    }
                </IconButton>

                <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={DeleteImage}
                >
                    <DeleteOutlineIcon sx={{ color: "red" }} />
                </IconButton>
            </div>
            <div className='image-handler__image-wrapper'>
                <img
                    src={src}
                    alt={alt}
                    className="image-handler__image"
                />
            </div>
        </div>
    )
};
