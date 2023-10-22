import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartStore } from "../../zustand-store/cartState";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { formatCurrency } from "../../utils/formatCurrency";

export function CardWine({ data, addCart }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { items, addItem } = useCartStore((store) => {
    return {
      items: store.items,
      addItem: store.addItem,
    };
  });

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    addCart();
    enqueueSnackbar(
      <Typography>Vinho adicionado adicionado ao carrinho.</Typography>,
      { variant }
    );
  };

  console.log('rapaize', data)

  return (
    <Card style={{ width: '100%', height: '370px', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      alt="Vinho Wine Emporium"
      height="140"
      image={data?.images.filter(item => item.marked == true).map(item => item.url)}
      style={{ objectFit: "contain" }}
    />
    <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      <Typography gutterBottom variant="h5" component="div"fontSize={16}>
        {data.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {data.description.length > 100 ? `${data?.description.slice(0, 60)}...` : data?.description}
      </Typography>
      <Typography  gutterBottom variant="subtitle1" component="span">
              {/* {formatCurrency(data?.price)} */}
              {Number(data?.price)}
      </Typography>
    </CardContent>
    <CardActions style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
                gutterBottom
                variant="subtitle2"
                style={{ color: "gray", flexGrow: 1 }}
              >
                Adicionar ao carrinho
        </Typography>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon onClick={handleClickVariant("success")}>
            Show success snackbar
          </AddShoppingCartIcon>
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          style={{ position: "relative", bottom: "5px" }}
        >
          <Link to={`/mercado/${data?.id}`}>
            <RemoveRedEyeTwoToneIcon />
          </Link>
        </IconButton>
    </CardActions>
  </Card>
);
}
