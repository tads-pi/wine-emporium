import Form from "react-bootstrap/Form";
import useSaveProduct from "./hooks"
import UploadImage from "../../../components/upload/UploadImage"
import "./style.css"

export default function SaveProduct() {
    const [
        data,
        loading,
        onSubmit,
        setImageData,
        productToSave,
        setProductToSave,
    ] = useSaveProduct()

    return (
        <>
            {
                loading ? <div>Carregando...</div> :
                    <div className="update-product__container">
                        {/* real time debug */}
                        {/* {JSON.stringify(productToSave)} */}

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
                                    value={productToSave?.name || ""}
                                    onChange={(e) => {
                                        setProductToSave({
                                            ...productToSave,
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
                                    value={productToSave?.description || ""}
                                    onChange={(e) => {
                                        setProductToSave({
                                            ...productToSave,
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
                                    value={productToSave?.price || ""}
                                    onChange={(e) => {
                                        setProductToSave({
                                            ...productToSave,
                                            price: e.target.value
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
