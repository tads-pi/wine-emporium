import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Drawer, styled } from '@mui/material';
import { CartItemCard } from '../CartItemCard';
import { formatCurrency } from '../../utils/formatCurrency';
import SettingsWE from './components/SettingsWE';
import useNavBarWE from './hooks';
import LogoWE from './components/LogoWE';
import AvatarWE from './components/AvatarWE';
import DrawerWE from './components/DrawerWE';

export function NavBarWE() {
  const {
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
  } = useNavBarWE()

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoWE />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <Box sx={{ flexGrow: 0 }}>
            {
              isLoggedIn ?
                <>
                  <AvatarWE handleOpenUserMenu={handleOpenUserMenu} />
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
                    <SettingsWE />
                  </Menu>
                </>
                : null
            }


            <IconButton style={{ color: 'black', marginLeft: '10px' }} aria-label="cart" onClick={hideOrShowDrawer}>
              <StyledBadge badgeContent={numItems} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>

            <DrawerWE
              isLoggedIn={isLoggedIn}
              drawerOpen={drawerOpen}
              hideOrShowDrawer={hideOrShowDrawer}
              cartItems={cartItems}
              totalPrice={totalPrice}
              removeCartItem={removeCartItem}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}