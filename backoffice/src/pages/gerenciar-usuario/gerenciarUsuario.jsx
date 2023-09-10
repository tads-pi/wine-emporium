import { useEffect, useState } from "react"
import logo from "./images/logo.png"

import "./style.css"

import { useDispatch, useSelector } from "react-redux"
import { fetchBackofficeUsers } from "../../store/apps/api/users"

export default function GerenciarUsuario() {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.appReportBackofficeUsers)

    const [users, setUsers] = useState([])

    const [userToUpdate, setUserToUpdate] = useState()

    // function onChangeSearch(e) {
    //     const search = e.target.value.toLowerCase()

    //     setUsers(data.filter((item) => {
    //         // essa funcao .filter é tipo um for mais simplificado
    //         // ela percorre o array data e retorna um novo array com os itens que satisfazem a condicao
    //         // nesse caso, a condicao é que o nome do usuario contenha o texto digitado no campo de pesquisa 
    //         return item.name.toLowerCase().includes(search)
    //     }))
    // }

    function changeUserToUpdate(id) {
        setUserToUpdate(id)
    }

    const [forceReload, setForceReload] = useState(false)
    useEffect(() => {
        console.log("fetching users...");
        dispatch(fetchBackofficeUsers())
    }, [forceReload])

    useEffect(() => {
        if (selector.status === 200) {
            setUsers(selector.data)
        }
    }, [selector.status, selector.data])

    useEffect(() => {
        console.log("found users: ", users)
    }, [users])

    return (
        <div className="container">
            <button onClick={() => setForceReload(!forceReload)}>Reload</button>

            <header className="cab">
                <div className="container__logo">
                    <img src={logo} alt="logo" />
                </div>
                <h1>Gerenciar Usuários</h1>
            </header>

            <div className="subcabecalho">
                <div className="botoes">
                    {/* <!-- Botões de "Incluir Usuário" e "Alterar Usuário" --> */}
                    <button className="btn">Incluir Usuário</button>

                    {
                        userToUpdate &&
                        <button
                            className="btn"
                            onClick={() => {
                                if (userToUpdate) {
                                    alert(`Alterando o usuário com ID: ${userToUpdate}`)
                                } else {
                                    alert("Selecione um usuário para alterar")
                                }
                            }}
                        >Alterar Usuário</button>
                    }

                </div>

                <div>
                    {/* <!-- Campo de pesquisa e tabela --> */}
                    <input
                        type="text"
                        placeholder="Pesquisar por nome de usuário"
                        className="subcabecalho__search"

                    // onChange={onChangeSearch}
                    />
                </div>
            </div>


            <table id="myTable">
                <tr>
                    <th>Status</th>
                    <th>ID do Usuário</th>
                    <th>Login do Usuário</th>
                    <th>Nome Completo do Usuário</th>
                    <th>E-mail do Usuário</th>
                    <th>Bloqueio de Usuário</th>
                </tr>

                {
                    // essa funcao .map é tipo um for mais simplificado
                    // ela percorre o array 'users' e retorna um elemento <tr> para cada item do array
                    // e retorna o array de elementos <tr> para ser renderizado na tela
                    users.map((item, index) => (
                        <tr key={index}
                            onClick={() => changeUserToUpdate(item.id)}

                            style={{
                                backgroundColor: userToUpdate === item.id ? "#ccc" : "transparent"
                            }}
                        >
                            <td>
                                <span className={`status-dot ${item.active ? "active" : "inactive"}-dot`}></span>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.login}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{
                                item.deleted
                                    ? "Ativo"
                                    : "Inativo"
                            }</td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}