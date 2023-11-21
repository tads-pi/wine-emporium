import { useParams } from "react-router-dom";
import Form from "../components/Form";
import LoadingWE from "../../../components/loading/LoadingWE";
import useSaveProduct from "../Save/hooks";
import LivePreviewWE from "../../../components/LivePreview/LivePreviewWE";
import { VerMais } from "../../../components/VerMais/index";
import "./style.css"

export default function UpdateProduct() {
    const { id } = useParams()
    const [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
        deleteImage,
        markImage,
    ] = useSaveProduct({
        productID: id,
    })

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    <div
                        className="update-product__container container"
                        style={{
                            flexDirection: window.innerWidth < 768 ? "column" : "row",
                        }}
                    >
                        <Form
                            onSubmit={(e) => {
                                const check = window.confirm("Deseja mesmo salvar as alterações?")
                                if (check) {
                                    onSubmit(e)
                                }
                            }}
                            onFormUpdate={onFormUpdate}
                            formData={formData}
                            title={"Editar Produto"}
                            submitButtonText={"Salvar"}
                            editMode={true}
                            deleteImage={deleteImage}
                            markImage={markImage}
                        />

                        <LivePreviewWE
                            component={
                                <PREVIEW
                                    formData={formData}
                                />
                            }
                            containerClassName={"update-product__live-preview"}
                        />
                    </div>
            }
        </>
    )
}

const PREVIEW = ({ formData }) => {
    return (
        <div>
            <VerMais
                autofill={formData}
            />
        </div>
    )
}