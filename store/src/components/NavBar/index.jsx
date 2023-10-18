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
import { Badge, Drawer, Grid, styled } from '@mui/material';
import { CardWine } from '../CardWine';
import { useCartStore } from '../../zustand-store/cartState';
import { api } from '../../lib/axios';
import { Slider } from '../Slider';
import { CartItemCard } from '../CartItemCard';
import logo from '../../../public/LOGO.png'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Perfil', 'Conta', 'Dashboard', 'Sair'];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const { items, addItem, removeItem } = useCartStore(store => {
    return {
      items: store.items,
      addItem: store.addItem,
      removeItem: store.removeItem
    }
  })

  /*const { data, isLoading, status } = useWineData()*/


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

  React.useEffect(() => {
    api.get('/v1/store/product')
      .then((res) => {
        setData(res?.data?.products)
      })
      .catch((err) => {
      })
  }, [])

  return (
    <div>
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

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton style={{ color: 'black', marginLeft: '10px' }} aria-label="cart" onClick={hideOrShowDrawer}>
                <StyledBadge badgeContent={items.length} color="secondary">
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
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Slider data={data} />
      <Grid container spacing={2}>
        {
          data?.map((wine) => (
            <Grid item key={wine.uuid} xs={12} sm={6} md={4} lg={3}>
              <CardWine data={wine} addCart={() => addItem(wine)} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
