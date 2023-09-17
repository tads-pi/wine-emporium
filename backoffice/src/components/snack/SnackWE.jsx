import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";

export default function SnackWE() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [type, setType] = useState("success")
    const selector = useSelector(state => state.snackSlice)

    useEffect(() => {
        setOpen(selector.open)
        setMessage(selector.message)
        setType(selector.type)
    }, [selector.open, selector.message, selector.type])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
