import React from "react";
import TableWE from "../../../components/table/TableWE.jsx"
import Slider from "@mui/material/Slider";
import useListCheckouts from "./hooks.js"
import "./style.css"

export default function ListCheckouts() {
    const [
        data,
        loading,
        onDoubleClick,
    ] = useListCheckouts()

    const checkouts = data.map((c, index) => {
        return {
            ...c,
            fake_id: `#${c?.sequentialId}`,
        }
    })

    const columns = [
        "fake_id",
        "status",
        "price",
    ]
    const columnsTitle = [
        "ID",
        "Status",
        "Total (R$)"
    ]

    return (
        <div className="container">
            <TableWE
                data={checkouts}
                columns={columns}
                columnsTitle={columnsTitle}
                onDoubleClick={onDoubleClick}
                loadingData={loading}
                totalItems={null}
                currentPage={null}
                hideSearch
            />
        </div >
    )
}