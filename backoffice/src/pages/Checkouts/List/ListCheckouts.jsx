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

    const columns = [
        "sequentialId",
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
                data={data}
                columns={columns}
                columnsTitle={columnsTitle}
                onDoubleClick={onDoubleClick}
                loadingData={loading}
                hideSearch
            />
        </div >
    )
}