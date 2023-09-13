import Table from "react-bootstrap/Table"
import useListProduct from "./hooks.js"

import "./style.css"
import TableRow from "./components/TableRow.jsx"

export default function ListProducts() {
    const [
        data,
        loading,
        onChangeSearchText,
        productToUpdate,
        onSetProductToUpdate,
    ] = useListProduct()

    const { products } = data

    return (
        <div className="container">
            {
                loading ? <div>Carregando...</div> :
                    <>
                        {
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Estoque</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products &&
                                        products.map((product, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                    product={product}
                                                    onClick={onSetProductToUpdate}
                                                    // TODO filtrar se eh admin e mostrar mais ou menos fields
                                                    view={[
                                                        "id",
                                                        "name",
                                                        "description",
                                                        "price",
                                                        "stock"
                                                    ]}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                    </>
            }
        </div >
    )
}