import React from "react"
import { CircularProgress } from "@mui/material"
import "./style.css"

export default function Loading() {
    return (
        <div className="loading__container">
            <CircularProgress />
        </div>
    )
}
