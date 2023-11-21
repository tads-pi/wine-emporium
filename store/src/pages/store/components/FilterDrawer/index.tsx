import { Box, Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import FilterWrapper from "../FilterWrapper";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ListProductsParams } from "../../../../zustand/types";

interface FilterDrawerProps {
    fetchProducts: (input: ListProductsParams) => void
}

export default function FilterDrawer(props: FilterDrawerProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const hideOrShowDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '0.5rem',
            width: '100%',
        }}>
            <Button onClick={hideOrShowDrawer}>
                <FilterAltIcon />
                Filtrar
            </Button>

            <DrawerWrapper
                drawerOpen={drawerOpen}
                hideOrShowDrawer={hideOrShowDrawer}
                fetchProducts={props.fetchProducts}
            />
        </div>
    )
};

function DrawerWrapper({
    drawerOpen, hideOrShowDrawer, fetchProducts
}: { drawerOpen: boolean, hideOrShowDrawer: () => void, fetchProducts: (input: ListProductsParams) => void }) {
    return (
        <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={hideOrShowDrawer}
        >
            <Box
                sx={{
                    width: '100%',
                    height: window.innerHeight / 1.25,
                    overflow: 'scroll'
                }}
                role="presentation"
            >
                <FilterWrapper fetchProducts={fetchProducts} />
            </Box>
        </Drawer>
    )
}