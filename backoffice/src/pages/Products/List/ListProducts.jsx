import NavBarWE from "../../../components/navbar/NavBarWE.jsx"
import useListProduct from "./hooks.js"

import "./style.css"

export default function ListProducts() {
    const [
        data,
        loading,
        onChangeSearchText,
        productToUpdate,
        setProductToUpdate,
    ] = useListProduct()

    return (
        <div className="container">
            {
                loading ? <div>Carregando...</div> :
                    <>
                        {
                            data.map(p => p)
                        }
                    </>
            }
        </div >
    )
}