import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Drawer, styled } from '@mui/material';
import { useCartStore } from '../../zustand-store/cartState';
import { CartItemCard } from '../CartItemCard';
import logo from '../../../public/LOGO.png'
import cartEmpty from '../../../public/8504.jpg'
import { Settings } from '../Settings';
import { formatCurrency } from '../../utils/formatCurrency';

export function Nav() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [numItems, setNumItems] = React.useState(0); // novo estado para controlar o número de itens no carrinho
    const { items, addItem, removeItem } = useCartStore(store => {
        return {
          items: store.items,
          addItem: store.addItem,
          removeItem: store.removeItem
        }
      })

    React.useEffect(() => {
        // atualiza o preço total sempre que o número de itens no carrinho muda
        const newTotalPrice = items.reduce((total, item) => Number(total) + Number(item.price), 0);
        setTotalPrice(newTotalPrice);
        setNumItems(items.length);
    }, [items.length]); // usa o novo estado numItems como dependência

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

      const hideOrShowDrawer = () => {
        setDrawerOpen(!drawerOpen);
      };


    return (
        <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="Logo Wine" />
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

           
            {/* <img src={logo} alt="Logo Wine" /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Wine Emporium
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Gedione Souza" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Settings />
              </Menu>
              <IconButton style={{ color: 'black', marginLeft: '10px' }} aria-label="cart" onClick={hideOrShowDrawer}>
                <StyledBadge badgeContent={numItems} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Drawer
                anchor="right" // Set the anchor to "right" for right side placement
                open={drawerOpen} // Control open/close state
                onClose={hideOrShowDrawer} // Function to close the Drawer
              >
                {items?.map((wine, index) => (
                  <CartItemCard key={index} data={wine} removeCart={() => removeItem(index)} />
                ))}
                <div style={{ display: 'flex', justifyContent: 'end', marginRight: '20px', width: '400px' }}>
                  <Typography style={{ placeSelf: 'self-end' }} variant="h6" component="h6" gutterBottom>
                    {items.length > 0 && `Total: ${formatCurrency(totalPrice)}`}
                    {items.length == 0 && <img src={cartEmpty} alt="Carrinho vazio" />}
                    {/* {items.length == 0 && <p>Meu pau</p>} */}
                  </Typography>
                </div>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}