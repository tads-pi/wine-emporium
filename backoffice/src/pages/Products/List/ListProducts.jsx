import TableWE from "../../../components/table/TableWE.jsx"
import Slider from "@mui/material/Slider";
import useListProduct from "./hooks.js"
import "./style.css"

export default function ListProducts() {
    const [
        data,
        loading,
        onChangeSearchText,
        searchTextField,
        onChangeSearchTextField,
        onSetProductToUpdate,
    ] = useListProduct()

    const { products } = data

    const columns = [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "custom:active"
    ]

    // TODO make it work
    function SliderWE() {
        return (
            <div className="toggle__container">
                <Slider
                    onChange={(e) => {
                        console.log("e", e.target.value);
                    }}
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={1}
                />
            </div>
        )
    }

    return (
        <div className="container">
            <TableWE
                data={products}
                custom={{
                    active: <SliderWE />
                }}
                columns={columns}
                onDoubleClick={onSetProductToUpdate}
                loadingData={loading}
                onSearch={onChangeSearchText}
                searchTextField={searchTextField}
                onSearchFieldSelected={onChangeSearchTextField}
                searchChoices={columns}
            />
        </div >
    )
}