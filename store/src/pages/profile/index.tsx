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
      width: window.innerWidth > 600 ? 'fit-content' : '100%',
      minHeight: '15%',
    }}>
      <CardContent sx={{
        display: 'flex',
        gap: '0.75rem',
        flexDirection: window.innerWidth > 600 ? 'column' : 'row',
        justifyContent: window.innerWidth > 600 ? 'flex-start' : 'space-between',
      }}>
        <Link to={routes.ACCOUNT_DATA} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <AccountCircleIcon color='success' />
            <Text title='Perfil' />
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_ADDRESS} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <LocalShippingIcon color='secondary' />
            <Text title='Endereço de entrega' />
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_CREDIT_CARD} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <CreditCardIcon color='info' />
            <Text title="Cartões de Crédito" />
          </Wrapper>
        </Link>
        <Link to={routes.ACCOUNT_CHECKOUTS} style={{ textDecoration: 'none' }}>
          <Wrapper>
            <LocalMall fontSize='small' color='warning' />
            <Text title="Pedidos" />
          </Wrapper>
        </Link>
      </CardContent>

      <CardActions>
        <Link to={routes.STORE}>
          <Button size="small">Ir para Loja</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

function Text({ title }: { title: string }) {
  if (window.innerWidth < 600) return null

  return (
    <Typography sx={{ fontSize: 16, marginBottom: 0 }} color="text.secondary" gutterBottom>
      {title}
    </Typography>
  )
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