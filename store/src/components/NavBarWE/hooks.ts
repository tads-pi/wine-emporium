import { useState } from "react";
import useStore from "../../zustand/store";

export default function useNavBarWE() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [numItems, setNumItems] = useState(0); // novo estado para controlar o número de itens no carrinho
    const {
        authApi,
    } = useStore()

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const hideOrShowDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return {
        handleOpenUserMenu,
        handleCloseUserMenu,
        hideOrShowDrawer,
        anchorElUser,
        numItems,
        drawerOpen,
        isLoggedIn: authApi.isLoggedIn,
    }
};
