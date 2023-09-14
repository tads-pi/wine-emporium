import Form from "react-bootstrap/Form";
import useSaveUser from "./hooks"
import "./style.css"

export default function SaveUser() {
    const [
        data,
        loading,
        onSubmit,
        userToSave,
        setUserToSave,
    ] = useSaveUser()

    return (
        <>
            {
                loading ? <div>Carregando...</div> :
                    <div className="update-user__container">
                        {/* real time debug */}
                        {/* {JSON.stringify(userToSave)} */}

                        <Form
                            onSubmit={onSubmit}
                        >
                            <Form.Group className="mb-3" >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Fulano de Tal"
                                    value={userToSave?.name || ""}
                                    onChange={(e) => {
                                        setUserToSave({
                                            ...userToSave,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="012.345.678-90"
                                    value={userToSave?.document || ""}
                                    onChange={(e) => {
                                        setUserToSave({
                                            ...userToSave,
                                            document: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="email@example.com"
                                    value={userToSave?.email || ""}
                                    onChange={(e) => {
                                        setUserToSave({
                                            ...userToSave,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="***"
                                    value={userToSave?.password || ""}
                                    onChange={(e) => {
                                        setUserToSave({
                                            ...userToSave,
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                {/**TODO trocar para select */}
                                <Form.Label>Grupo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="***"
                                    value={userToSave?.group || ""}
                                    onChange={(e) => {
                                        setUserToSave({
                                            ...userToSave,
                                            group: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control type="submit" value="Concluir" />
                            </Form.Group>
                        </Form>
                    </div>
            }
        </>
    )
}
