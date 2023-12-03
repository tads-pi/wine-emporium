import LivePreviewWE from "../../../components/LivePreview/LivePreviewWE";
import { VerMais } from "../../../components/VerMais";
import LoadingWE from "../../../components/loading/LoadingWE";
import Form from "../components/Form";
import useSaveProduct from "./hooks"
import "./style.css"

export default function SaveProduct() {
    const [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
        deleteImage,
        markImage,
    ] = useSaveProduct()

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
                            onSubmit={onSubmit}
                            onFormUpdate={onFormUpdate}
                            formData={formData}
                            title={"Salvar Produto"}
                            submitButtonText={"Salvar"}
                            editMode={false}
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
                autofill={formData || {}}
            />
        </div>
    )
}
