import TableWE from "../../../components/table/TableWE.jsx"
import Slider from "@mui/material/Slider";
import useListUser from "./hooks.js"
import "./style.css"

export default function ListUsers() {
    const [
        data,
        loading,
        onChangeSearchText,
        searchTextField,
        onChangeSearchTextField,
        onDoubleClick,
        onToggleActive,
        totalItems,
        currentPage,
        onChangePage,
    ] = useListUser()

    const users = data

    const columns = [
        "id",
        "name",
        "email",
        "group",
        "custom:active"
    ]

    // TODO make it work
    function SliderWE(row) {
        return (
            <div className="toggle__container">
                <Slider
                    onChange={(e) => {
                        const value = e?.target?.value === 1
                        const check = window.confirm(`Deseja mesmo ${value ? "ativar" : "desativar"} esse usuário?`)
                        if (check) {
                            onToggleActive(row?.id || 0, value)
                        }
                    }}
                    defaultValue={row?.active ? 1 : 0}
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
                data={users}
                custom={{
                    active: SliderWE,
                }}
                columns={columns}
                onDoubleClick={onDoubleClick}
                loadingData={loading}
                onSearch={onChangeSearchText}
                searchTextField={searchTextField}
                onSearchFieldSelected={onChangeSearchTextField}
                searchChoices={columns}

                totalItems={totalItems}
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div >
    )
}