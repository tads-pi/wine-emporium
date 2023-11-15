import React from "react";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Card, CardActions, CardContent, CardMedia, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Product } from "../../zustand/types";
import { FALLBACK_IMAGE_URL } from "../../config/images";
import { routes } from "../../config/routes";
import { formatCurrency } from "../../utils/formatCurrency";

type CardWineProps = {
  data: Product,
  addCart: () => void
}

export function CardWine({ data, addCart }: CardWineProps) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const addItemToCart = () => {
    addCart();
    enqueueSnackbar(
      <Typography>Item adicionado ao carrinho!</Typography>,
      { variant: 'success' }
    );
  }

  function getImage() {
    if (data?.images.length > 0) {
      const [markedImage] = data?.images.filter((img) => img.marked)
      if (markedImage) {
        return markedImage.url
      }
      return data?.images[0].url
    } else {
      return FALLBACK_IMAGE_URL
    }
  }

  return (
    <Card
      style={{ width: '100%', height: '370px', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        alt="Vinho Wine Emporium"
        height="140"
        // TODO deveria mostrar só uma img mesmo?
        image={getImage()}
        style={{ objectFit: "contain" }}

        onClick={() => navigate(`${routes.STORE}/${data?.id}`)}
      />
      <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Typography gutterBottom variant="h5" component="div" fontSize={16}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description.length > 100 ? `${data?.description.slice(0, 60)}...` : data?.description}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="span">
          {formatCurrency(data?.price)}
        </Typography>
      </CardContent>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <CardActions style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="primary"
            aria-label="adiciona item ao carrinho"
            onClick={addItemToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card >
  );
}
