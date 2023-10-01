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
                    <div className="update-product__container container">
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
                    </div>
            }
        </>
    )
}
