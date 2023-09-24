import { useLocation } from "react-router-dom"
import Form from "../components/Form";
import LoadingWE from "../../../components/loading/LoadingWE";
import useSaveUser from "../Save/hooks";
import "./style.css"

export default function UpdateUser() {
    const { state } = useLocation()
    const [
        formData,
        onFormUpdate,
        loading,
        onSubmit,
    ] = useSaveUser({
        initialFormData: state.user,
    })

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    <div className="update-user__container container">
                        <Form
                            onSubmit={(e) => {
                                const check = window.confirm("Deseja mesmo salvar as alterações?")
                                if (check) {
                                    onSubmit(e)
                                }
                            }}
                            onFormUpdate={onFormUpdate}
                            formData={formData}
                            title={"Editar Usuário"}
                            submitButtonText={"Salvar"}
                            editMode={true}
                        />
                    </div>
            }
        </>
    )
}