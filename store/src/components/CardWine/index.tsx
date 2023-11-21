import React from "react";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Card, CardActions, CardContent, CardMedia, IconButton, Rating } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Product } from "../../zustand/types";
import { FALLBACK_IMAGE_URL } from "../../config/images";
import { routes } from "../../config/routes";
import { formatCurrency } from "../../utils/formatCurrency";
import WineBarIcon from '@mui/icons-material/WineBar';
import LiquorIcon from '@mui/icons-material/Liquor';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '350px',
        width: window.innerWidth > 600 ? '250px' : '100%',
        cursor: 'pointer',
        padding: '0.5rem',
      }}
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
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '75%',
      }}>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          padding: '0.5rem 0',
        }}>
          <Rating name="half-rating-read" defaultValue={data.ratings} precision={0.5} readOnly />
          {
            (
              () => {
                switch (data?.category) {
                  case 'VINHOS': return (<WineBarIcon htmlColor="#9374a3" />)
                  case 'UTILITARIOS': return (<AutoFixHighIcon htmlColor="#7499a3" />)
                  case 'OUTROS': return (<LiquorIcon htmlColor="darkgray" />)
                }

                return (<></>)
              }
            )()
          }
        </div>

        <Typography gutterBottom variant="h5" component="div" fontSize={16}>
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description.length > 100 ? `${data?.description.slice(0, 60)}...` : data?.description}
        </Typography>

      </div>

      <div style={{
        display: 'flex',
        height: '25%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.25rem',
      }}>
        <Typography gutterBottom variant="subtitle1" component="span">
          {formatCurrency(data?.price)}
        </Typography>

        <IconButton
          color="primary"
          aria-label="adiciona item ao carrinho"
          onClick={addItemToCart}
          style={{
            margin: '0',
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </Card >
  );
}
