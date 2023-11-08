import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { routes } from '../../config/routes';

export default function PerfilUser() {
  return (
    <Card style={{ width: '400px', marginTop: '40px', marginLeft: '35px', height: '150px' }}>
      <CardContent>
        <Link to='/perfil/alterar-dados' style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Perfil
          </Typography>
        </Link>
        <Link to='/perfil/endereco-de-entrega' style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Endereço de entrega
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