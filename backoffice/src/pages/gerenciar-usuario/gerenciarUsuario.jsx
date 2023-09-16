import useGerenciarUsuario from "./hooks/gerenciarUsuario"
import logo from "./images/logo.png"

import "./style.css"

export default function GerenciarUsuario() {
    const [
        users,
        loading,
        onChangeSearchText,
        userToUpdate,
        setUserToUpdate,
        updateUser
    ] = useGerenciarUsuario()

    return (
        <div className="container">
            {
                loading ? <div>Carregando...</div> :
                    <>
                        < header className="cab" >
                            <div className="container__logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <h1>Gerenciar Usuários</h1>
                        </header >

                        <div className="subcabecalho">
                            <div className="botoes">
                                {/* <!-- Botões de "Incluir Usuário" e "Alterar Usuário" --> */}
                                <button className="btn"
                                    onClick={updateUser}
                                >Incluir Usuário</button>

                                {
                                    userToUpdate &&
                                    <button
                                        className="btn"
                                        onClick={updateUser}
                                    >Alterar Usuário</button>
                                }

                            </div>

                            <div>
                                {/* <!-- Campo de pesquisa e tabela --> */}
                                <input
                                    type="text"
                                    placeholder="Pesquisar por nome de usuário"
                                    className="subcabecalho__search"

                                    onChange={onChangeSearchText}
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
                                users &&
                                users.map((item, index) => (
                                    <tr key={index}
                                        onClick={() => setUserToUpdate(item.id)}

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

                    </>
            }
        </div >
    )
}