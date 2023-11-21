import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, styled } from '@mui/material';
import SettingsWE from './components/SettingsWE';
import useNavBarWE from './hooks';
import AvatarWE from './components/AvatarWE';
import DrawerWE from './components/drawer/DrawerWE';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';

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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0.5rem'
      }}>
        <LogoWE />

        <div>
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
              :
              <>
                <Link to={routes.LOGIN} style={{ textDecoration: 'none' }}>
                  <span style={{ color: 'black' }}>Login</span>
                </Link>
              </>
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
        </div>
      </div>
    </AppBar >
  )
}

function LogoWE() {
  return (
    <div>
      <img src={'/LOGO.png'} alt="Logo" width={50} />
    </div>
  )
}