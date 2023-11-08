import Typography from "@mui/material/Typography";
import React from "react"

export default function LogoWE() {
    return (
        <>
            <img src={'../../../public/LOGO.png'} alt="Logo Wine" />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Wine Emporium
            </Typography>
        </>
    )
};
