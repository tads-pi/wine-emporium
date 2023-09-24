import LoadingWE from "../../../components/loading/LoadingWE";
import Form from "../components/Form";
import useSaveUser from "./hooks"
import "./style.css"

export default function SaveUser() {
    const [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
    ] = useSaveUser({})

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    <div className="update-user__container container">
                        <Form
                            onSubmit={onSubmit}
                            onFormUpdate={onFormUpdate}
                            formData={formData}
                            title={"Salvar Usuário"}
                            submitButtonText={"Salvar"}
                            editMode={false}
                        />
                    </div>
            }
        </>
    )
}
