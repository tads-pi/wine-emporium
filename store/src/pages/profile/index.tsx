import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';

export default function ProfileWE() {
  return (
    <Card style={{
      minWidth: 'fit-content',
    }}>
      <CardContent>
        <Link to={routes.ACCOUNT_DATA} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Perfil
          </Typography>
        </Link>
        <Link to={routes.ACCOUNT_ADDRESS} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Endereço de entrega
          </Typography>
        </Link>
        <Link to={routes.ACCOUNT_CREDIT_CARD} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Cartões de Crédito
          </Typography>
        </Link>
        <Link to={routes.ACCOUNT_CHECKOUTS} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Compras
          </Typography>
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