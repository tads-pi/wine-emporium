import { useLocation } from "react-router-dom"
import Form from "../components/Form";
import LoadingWE from "../../../components/loading/LoadingWE";
import useSaveProduct from "../Save/hooks";
import "./style.css"

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
                    </div>
            }
        </>
    )
}