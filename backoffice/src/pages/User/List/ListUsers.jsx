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

    const users = data.map((u, index) => {
        return {
            ...u,
            fake_id: index,
            group: u?.group?.name || "",
        }
    })

    const columns = [
        "fake_id",
        "name",
        "email",
        "group",
        "custom:active"
    ]
    const columnsTitle = [
        "ID",
        "Nome",
        "E-mail",
        "Grupo",
        "Estado"
    ]

    function SliderWE(row) {
        return (
            <div className="toggle__container">
                <Slider
                    onChange={(e) => {
                        const value = e?.target?.value === 1
                        const check = window.confirm(`Deseja mesmo ${value ? "ativar" : "desativar"} esse usuário?`)
                        if (check) {
                            console.log({
                                id: users[row?.fake_id]?.id,
                                user: users[row?.fake_id],
                                row: row
                            });
                            onToggleActive(users[row?.fake_id]?.id)
                        }
                    }}
                    defaultValue={users[row?.fake_id]?.active ? 1 : 0}
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
                columnsTitle={columnsTitle}
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
        </div>
    )
}