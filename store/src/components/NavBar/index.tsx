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
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, BadgeProps, Drawer, Grid, styled } from '@mui/material';
import logo from '../../assets/LOGO.png'
import { CardWine } from '../CardWine';
import { useCartStore } from '../../zustand-store/cartState';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Perfil', 'Conta', 'Dashboard', 'Sair'];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const {items, addItem} = useCartStore(store => {
    return {
      items: store.items,
      addItem: store.addItem
    }
})

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
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

  const data = [
    {
      "id": 1,
      "uuid": "5e25e63a-928d-41b8-a947-a7a3e706e761",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "data:image/jpeg;base64,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"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
      "id": 1,
      "uuid": "5c80447d-7cbd-4cc0-8a65-5f2373e86c58",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcasacereser.vtexassets.com%2Farquivos%2Fids%2F155573%2Ffrente.jpg%3Fv%3D637932251948130000&tbnid=V7co6RrZmk7-yM&vet=12ahUKEwibu97ErMSBAxVIlJUCHf4RC7QQMygIegUIARCLAQ..i&imgrefurl=https%3A%2F%2Fwww.crsbrands.com.br%2Fvinho-bordo-suave-dom-bosco--1000ml-1un-2699%2Fp&docid=5thggzG9jAM65M&w=1000&h=1500&q=vinho&ved=2ahUKEwibu97ErMSBAxVIlJUCHf4RC7QQMygIegUIARCLAQ"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
      "id": 1,
      "uuid": "beb188ab-750c-40b6-a7f4-d64aca40b9cb",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcasacereser.vtexassets.com%2Farquivos%2Fids%2F155573%2Ffrente.jpg%3Fv%3D637932251948130000&tbnid=V7co6RrZmk7-yM&vet=12ahUKEwibu97ErMSBAxVIlJUCHf4RC7QQMygIegUIARCLAQ..i&imgrefurl=https%3A%2F%2Fwww.crsbrands.com.br%2Fvinho-bordo-suave-dom-bosco--1000ml-1un-2699%2Fp&docid=5thggzG9jAM65M&w=1000&h=1500&q=vinho&ved=2ahUKEwibu97ErMSBAxVIlJUCHf4RC7QQMygIegUIARCLAQ"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
      "id": 1,
      "uuid": "96fbc3a1-ae08-42c3-89fa-03f99583b5ca",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "data:image/jpeg;base64,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"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
      "id": 1,
      "uuid": "1c8525a5-3f45-4632-88e1-11b33ac0e1bf",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnhLufdAwz3khv4oSrvDFqu7KXuCYeOC-6Ag&usqp=CAU"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    },
    {
      "id": 1,
      "uuid": "58be08ec-a040-4a26-9e13-502232a2eb94",
      "name": "Vinho Chave",
      "slug": "vinho-chave",
      "description": "Vinho Fabricado em 1888 na vinícula de São Paulo",
      "price": "19.99",
      "images": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIke5B9S7XzY84ehDDXi2BlJnbqh-z3LdxA&usqp=CAU"
      ],
      "active": true,
      "deletedAt": "",
      "createAt": "2023-08-30T04:56:15.000Z",
      "updatedAt": "2023-08-30T04:56:15.000Z"
    }
  ]

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
            <img src={logo} alt="Logo Wine" />
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
                <IconButton style={{color: 'black', marginLeft: '10px'}} aria-label="cart" onClick={hideOrShowDrawer}>
                    <StyledBadge badgeContent={items.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <Drawer
                    anchor="right" // Set the anchor to "right" for right side placement
                    open={drawerOpen} // Control open/close state
                    onClose={hideOrShowDrawer} // Function to close the Drawer
                >
                    <p>Oooooooooooooooooooooooooooooooooooooooooi</p>
                </Drawer>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Grid container spacing={2}>
        {data.map((wine) => (
            <Grid item key={wine.uuid} xs={12} sm={6} md={4} lg={3}>
                <CardWine data={wine} addCart={() => addItem(wine)} />
            </Grid>
        ))}
        </Grid>
    </div>
  );
}
