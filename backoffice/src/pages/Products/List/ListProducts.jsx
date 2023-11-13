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
        onToggleActive,
        totalItems,
        currentPage,
        onChangePage,
    ] = useListProduct()

    const products = data.map((p, index) => {
        return {
            ...p,
            fake_id: index,
            stock: p?.stock[0]?.total || 0,
        }
    })

    const columns = [
        "fake_id",
        "name",
        "price",
        "stock",
        "custom:active"
    ]
    const columnsTitle = [
        "ID",
        "Nome",
        "Preço",
        "Estoque",
        "Estado"
    ]

    function SliderWE(row) {
        return (
            <div className="toggle__container">
                <Slider
                    onChange={(e) => {
                        const value = e?.target?.value === 1
                        const check = window.confirm(`Deseja mesmo ${value ? "ativar" : "desativar"} esse produto?`)
                        if (check) {
                            onToggleActive(products[row?.fake_id].id)
                        }
                    }}
                    defaultValue={products[row?.fake_id].active ? 1 : 0}
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
                    active: SliderWE,
                }}
                columns={columns}
                columnsTitle={columnsTitle}
                onDoubleClick={() => { }}
                loadingData={loading}
                onSearch={onChangeSearchText}
                searchTextField={searchTextField}
                onSearchFieldSelected={onChangeSearchTextField}
                searchChoices={['name']}

                totalItems={totalItems}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div >
    )
}