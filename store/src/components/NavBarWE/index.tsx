import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, styled } from '@mui/material';
import SettingsWE from './components/SettingsWE';
import useNavBarWE from './hooks';
import LogoWE from './components/LogoWE';
import AvatarWE from './components/AvatarWE';
import DrawerWE from './components/drawer/DrawerWE';

export function NavBarWE() {
  const {
    handleOpenUserMenu,
    handleCloseUserMenu,
    hideOrShowDrawer,
    anchorElUser,
    numItems,
    drawerOpen,
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
              drawerOpen={drawerOpen}
              hideOrShowDrawer={hideOrShowDrawer}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}