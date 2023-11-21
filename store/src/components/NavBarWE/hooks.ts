import { useState } from "react";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";

export default function useNavBarWE() {
    const navigate = useNavigate()
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

    function goHome(){
        navigate(routes.STORE)
    }

    return {
        handleOpenUserMenu,
        handleCloseUserMenu,
        hideOrShowDrawer,
        anchorElUser,
        numItems,
        drawerOpen,
        isLoggedIn: authApi.isLoggedIn,
        goHome,
    }
};
