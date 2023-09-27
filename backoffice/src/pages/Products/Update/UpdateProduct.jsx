import { useLocation } from "react-router-dom"
import Form from "../components/Form";
import LoadingWE from "../../../components/loading/LoadingWE";
import useSaveProduct from "../Save/hooks";
import "./style.css"
import LivePreviewWE from "../../../components/LivePreview/LivePreviewWE";

export default function UpdateProduct() {
    const { state } = useLocation()
    const [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
    ] = useSaveProduct({
        initialFormData: state.product,
    })

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    <div className="update-product__container container">
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
                        />

                        <LivePreviewWE
                            component={
                                <PREVIEW
                                    teste={"aloha"}
                                />
                            }
                            containerClassName={"update-product__live-preview"}
                        />
                    </div>
            }
        </>
    )
}

const PREVIEW = ({ teste }) => {
    return (
        <div>
            <h1>{teste}</h1>
        </div>
    )
}