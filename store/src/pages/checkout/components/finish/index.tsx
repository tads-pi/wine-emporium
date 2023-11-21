import React from "react"
import useCheckoutFinish from "./hooks"
import { Button } from "@mui/material"
import { ArrowBackIos } from "@mui/icons-material"

interface CheckoutFinishProps {
    handleNext: () => void,
    handleBack: () => void,
    goHome: () => void,
}

export default function CheckoutFinish(props: CheckoutFinishProps) {
    const {
        onSubmit,
    } = useCheckoutFinish(props)

    return (
        <form onSubmit={onSubmit}>
            <div>
                <Button
                    variant="outlined"
                    color="inherit"
                    size='small'
                    onClick={() => props.handleBack()}
                    style={{
                        margin: '1rem 0',
                    }}
                    startIcon={<ArrowBackIos fontSize="small" />}
                >
                    Voltar
                </Button>
            </div>
        </form>
    )
};
