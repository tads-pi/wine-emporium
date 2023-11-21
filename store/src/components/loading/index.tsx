import React from "react"
import { CircularProgress } from "@mui/material"
import "./style.css"

export default function Loading({ color }: { color?: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning" }) {
    return (
        <div className="loading__container">
            <CircularProgress color={color || 'info'} />
        </div>
    )
}
