import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import LoadingWE from "../loading/LoadingWE";
import { useEffect, useState } from "react";
import SearchBoxWE from "./SearchBoxWE";
import "./style.css"

export default function TableWE({
    // data printed
    data,
    custom,
    columns,
    columnsTitle,
    // loading
    loading,
    loadingData,
    // row click actions
    onHover,
    onClickRow,
    onDoubleClick,
    // search feature
    hideSearch = false,
    liveSearch,
    onSearch,
    searchChoices,
    searchTextField,
    onSearchFieldSelected,
    // pagination feature
    totalItems,
    currentPage,
    onChangePage,
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

        return custom[field](row)
    }

    return (
        <>
            {
                loading ? <LoadingWE /> :
                    <Paper>
                        <TableContainer
                            component={Paper}
                        >
                            {
                                !hideSearch &&
                                <SearchBoxWE
                                    onChangeSearchText={setSearch}
                                    choices={searchChoices}
                                    onSubmit={onSearch}
                                    searchText={search}
                                    searchField={searchField}
                                    onChangeSearchField={setSearchField}
                                />
                            }
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
                                                        <strong>{columnsTitle[i]}</strong>
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loadingData ? <SkeletonRows rowsPerPage={10} columns={columns} /> :
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
                                            ))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            totalItems && currentPage &&
                            <TablePagination
                                // todo add this option
                                rowsPerPageOptions={[10]}
                                component="div"
                                count={totalItems}
                                page={currentPage}
                                onPageChange={(_, page) => {
                                    console.log("page: ", page);
                                    onChangePage(page)
                                }}
                                rowsPerPage={10}
                            />
                        }
                    </Paper>
            }
        </>
    );
}

function SkeletonRows({ rowsPerPage, columns }) {
    let el = []

    for (let i = 0; i < rowsPerPage; i++) {
        el.push(
            <TableRow
                key={i}
                className="table-we__row"
                sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                }}
            >
                {
                    columns.map((_, j) => (
                        <TableCell key={j}>
                            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                        </TableCell>
                    ))
                }
            </TableRow>
        )
    }

    return el
}