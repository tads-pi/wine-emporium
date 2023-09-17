import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingWE from "../loading/LoadingWE";
import { useEffect, useState } from "react";
import SearchBoxWE from "./SearchBoxWE";
import "./style.css"

export default function TableWE({
    data,
    custom,
    columns,
    loading,
    loadingData,
    onHover,
    onClickRow,
    onDoubleClick,
    liveSearch,
    onSearch,
    searchChoices,
    searchTextField,
    onSearchFieldSelected,
}) {
    const [search, setSearch] = useState("")
    const [searchField, setSearchField] = useState(searchTextField || "")

    useEffect(() => {
        if (liveSearch) {
            onSearch(search)
        }
    }, [search])

    useEffect(() => {
        if (searchField) {
            onSearchFieldSelected(searchField)
        }
    }, [searchField])

    function objectContainsAnyOf(obj, arr) {
        let contains = false
        arr.forEach((element) => {
            if (obj[element]) contains = true
        })
        return contains
    }

    function getCustomComponent(row, field) {
        const isCustom = field.includes("custom:")
        field = field.replace("custom:", "")
        if (!isCustom) {
            return false
        }

        return custom[field]
    }


    return (
        <>
            {
                loading ? <LoadingWE /> :

                    <TableContainer
                        component={Paper}
                    >
                        <SearchBoxWE
                            onChangeSearchText={setSearch}
                            choices={searchChoices}
                            onSubmit={onSearch}
                            searchText={search}
                            searchField={searchField}
                            onChangeSearchField={setSearchField}
                        />
                        {
                            loadingData ? <LoadingWE /> :
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                columns &&
                                                columns.map((column, i) => {
                                                    const isCustom = column.includes("custom:")
                                                    if (isCustom) {
                                                        column = column.replace("custom:", "")
                                                    }

                                                    return (
                                                        <TableCell key={i}>
                                                            <strong>{column}</strong>
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data &&
                                            data.map((row, i) => (
                                                <TableRow
                                                    key={i}
                                                    className="table-we__row"
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    {
                                                        columns &&
                                                        objectContainsAnyOf(row, columns) &&
                                                        columns.map((column, j) => (
                                                            <TableCell
                                                                key={j}
                                                                onClick={() => {
                                                                    onClickRow && onClickRow(row)
                                                                }}
                                                                onDoubleClick={() => onDoubleClick && onDoubleClick(row)}
                                                                onMouseOver={() => onHover && onHover(row)}
                                                            >
                                                                {
                                                                    getCustomComponent(row, column) || row[column]
                                                                }
                                                            </TableCell>
                                                        ))
                                                    }
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                        }
                    </TableContainer>
            }
        </>
    );
}
