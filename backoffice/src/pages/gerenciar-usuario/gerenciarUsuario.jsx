import {useState} from "react"
import logo from "./images/logo.png"

import "./style.css"

import { data } from "./data.js"

export default function GerenciarUsuario(){
    const [users, setUsers] = useState(data)

    function onChangeSearch(e) {
        const search = e.target.value.toLowerCase()

        setUsers(data.filter((item) => {
            // essa funcao .filter é tipo um for mais simplificado
            // ela percorre o array data e retorna um novo array com os itens que satisfazem a condicao
            // nesse caso, a condicao é que o nome do usuario contenha o texto digitado no campo de pesquisa 
            return item.name.toLowerCase().includes(search)
        }))
    }

    return (
        <div className="container">
            <header className="cab">
                <div className="container__logo">
                    <img src={logo} alt="logo"/>
                </div>
                <h1>Gerenciar Usuários</h1>
            </header>

            <div className="subcabecalho">
                <div className="botoes">
                    {/* <!-- Botões de "Incluir Usuário" e "Alterar Usuário" --> */}
                    <button className="btn" onClick="incluirUsuario()">Incluir Usuário</button>
                    <button className="btn"  onClick="alterarUsuario()">Alterar Usuário</button>
                </div>

                <div>
                    {/* <!-- Campo de pesquisa e tabela --> */}
                    <input 
                        type="text" 
                        placeholder="Pesquisar por nome de usuário"
                        className="subcabecalho__search"

                        onChange={onChangeSearch}
                    />
                </div>
            </div>
    

            <table id="myTable">
                <tr>
                    <th>Status</th>
                    <th>ID do Usuário</th>
                    <th>Login do Usuário</th>
                    <th>Nome Completo do Usuário</th>
                    <th>Bloqueio de Usuário</th>
                </tr>

                {
                    // essa funcao .map é tipo um for mais simplificado
                    // ela percorre o array 'users' e retorna um elemento <tr> para cada item do array
                    // e retorna o array de elementos <tr> para ser renderizado na tela
                    users.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <span className={`status-dot ${
                                    item.active ? "active" : "inactive"
                                }-dot`}></span>
                            </td>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
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