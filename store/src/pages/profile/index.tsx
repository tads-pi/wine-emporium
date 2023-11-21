import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';
import LocalMall from '@mui/icons-material/LocalMall';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfileWE() {
  return (
    <Card style={{
      minWidth: 'fit-content',
    }}>
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        <Link to={routes.ACCOUNT_DATA} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <AccountCircleIcon color='success' />
            <Typography sx={{ fontSize: 16, marginBottom: 0 }} color="text.secondary" gutterBottom>
              Perfil
            </Typography>
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_ADDRESS} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <LocalShippingIcon color='secondary' />
            <Typography sx={{ fontSize: 16, marginBottom: 0 }} color="text.secondary" gutterBottom>
              Endereço de entrega
            </Typography>
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_CREDIT_CARD} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <CreditCardIcon color='info' />
            <Typography sx={{ fontSize: 16, marginBottom: 0 }} color="text.secondary" gutterBottom>
              Cartões de Crédito
            </Typography>
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_CHECKOUTS} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <LocalMall fontSize='small' color='warning' />
            <Typography sx={{ fontSize: 16, marginBottom: 0 }} color="text.secondary" gutterBottom>
              Pedidos
            </Typography>
          </Wrapper>
        </Link>
      </CardContent>
      <CardActions>
        <Link to={routes.STORE}>
          <Button size="small">Voltar</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

function Wrapper(props: any) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '0.5rem',
    }}>
      {props.children}
    </div>
  )
}