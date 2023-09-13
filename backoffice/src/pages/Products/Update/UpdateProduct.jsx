import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom"
import useUpdateProduct from "./hooks"
import UploadImage from "../../../components/upload/UploadImage"
import "./style.css"

export default function UpdateProduct() {
    const { state } = useLocation()
    const [
        data,
        loading,
        onSubmit,
        setImageData,
        productToUpdate,
        setProductToUpdate,
        deleteProduct,
        toggleActive
    ] = useUpdateProduct(state)

    return (
        <>
            {
                loading ? <div>Carregando...</div> :
                    <div className="update-product__container">
                        {JSON.stringify(productToUpdate)}

                        <UploadImage
                            imageHook={setImageData}
                        />
                        <Form
                            onSubmit={onSubmit}
                        >
                            <Form.Group className="mb-3" >
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Wine Emporium"
                                    value={productToUpdate?.name || ""}
                                    onChange={(e) => {
                                        setProductToUpdate({
                                            ...productToUpdate,
                                            name: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Wine Emporium"
                                    value={productToUpdate?.description || ""}
                                    onChange={(e) => {
                                        setProductToUpdate({
                                            ...productToUpdate,
                                            description: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Wine Emporium"
                                    value={productToUpdate?.price || ""}
                                    onChange={(e) => {
                                        setProductToUpdate({
                                            ...productToUpdate,
                                            price: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={productToUpdate?.stock || 0}
                                    onChange={(e) => {
                                        setProductToUpdate({
                                            ...productToUpdate,
                                            stock: e.target.value
                                        })
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Ativo</Form.Label>
                                <Form.Check
                                    type="switch"
                                    label={"Ativo"}
                                    checked={productToUpdate?.active}
                                    onChange={() => {
                                        setProductToUpdate({
                                            ...productToUpdate,
                                            active: !productToUpdate?.active
                                        })
                                        toggleActive(productToUpdate)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        const accept = confirm(`Deseja mesmo deletar o produto '${productToUpdate?.name}'?`)
                                        if (accept) {
                                            deleteProduct(productToUpdate)
                                        }
                                    }}
                                >Deletar</Button>
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
