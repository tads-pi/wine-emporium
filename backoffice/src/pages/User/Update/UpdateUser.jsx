import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom"
import useUpdateUser from "./hooks"
import "./style.css"

export default function UpdateUser() {
    const { state } = useLocation()
    const [
        data,
        loading,
        onSubmit,
        userToUpdate,
        setUserToUpdate,
        deleteUser,
        toggleActive,
    ] = useUpdateUser(state)

    return (
        <>
            {
                loading ? <div>Carregando...</div> :
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <div className="update-user__container">
                            {/*JSON.stringify(userToUpdate)*/}

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
                                        setUserToUpdate({
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
                                        setUserToUpdate({
                                            ...userToSave,
                                            document: e.target.value
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
                                        setUserToUpdate({
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
                                        setUserToUpdate({
                                            ...userToSave,
                                            group: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Ativo</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        label={"Ativo"}
                                        checked={userToUpdate?.active}
                                        onChange={() => {
                                            setUserToUpdate({
                                                ...userToUpdate,
                                                active: !userToUpdate?.active
                                            })
                                            toggleActive(userToUpdate)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            const accept = confirm(`Deseja mesmo deletar o usuario '${userToUpdate?.name}'?`)
                                            if (accept) {
                                                deleteUser(userToUpdate)
                                            }
                                        }}
                                    >Deletar</Button>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="submit" value="Concluir" />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
            }
        </>
    )
}
