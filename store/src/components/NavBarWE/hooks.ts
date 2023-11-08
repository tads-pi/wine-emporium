import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function useNavBarWE() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [numItems, setNumItems] = useState(0); // novo estado para controlar o número de itens no carrinho
    const {
        isLoggedIn,
        cartItems,
        removeCartItem,
    } = useStore()

    useEffect(() => {
        // atualiza o preço total sempre que o número de itens no carrinho muda
        const newTotalPrice = cartItems.reduce((total, item) => Number(total) + Number(item.product.price), 0);
        setTotalPrice(newTotalPrice);
        setNumItems(cartItems.length);
    }, [cartItems.length]); // usa o novo estado cartItems como dependência

    // TODO será que pode ser any mesmo?
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
        cartItems,
        drawerOpen,
        totalPrice,
        removeCartItem,
        isLoggedIn,
    }
};
