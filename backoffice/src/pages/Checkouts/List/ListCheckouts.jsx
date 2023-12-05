import React from "react";
import TableWE from "../../../components/table/TableWE.jsx"
import useListCheckouts from "./hooks.js"
import dayjs from "dayjs"
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
            finishedAt: c?.finishedAt ? dayjs(c?.finishedAt).format("DD/MM/YYYY HH:mm") : "",
        }
    })

    const columns = [
        "fake_id",
        "status",
        "price",
        "finishedAt",
    ]
    const columnsTitle = [
        "ID",
        "Status",
        "Total (R$)",
        "Data Pedido",
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