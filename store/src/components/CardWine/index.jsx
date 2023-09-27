import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { CardMedia, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartStore } from "../../zustand-store/cartState";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

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

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Box sx={{ my: 3, mx: 2 }} key={data.uuid}>
        <Grid container alignItems="center">
          <Grid item xs>
            <CardMedia
              component="img"
              height="140"
              image={data.images[0]}
              alt="Vinho Wine Emporium"
              style={{ objectFit: "contain" }}
            />
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="h6" component="div">
                {data.name}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="span">
                ${data.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="subtitle2">
          {data.description}
        </Typography>
        <Link to={`/mercado/${data.id}`}>Ver Mais</Link>
      </Box>

      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle2"
            style={{ color: "gray" }}
          >
            Adicionar vinho ao carrinho
          </Typography>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            style={{ position: "relative", bottom: "5px" }}
          >
            <AddShoppingCartIcon onClick={handleClickVariant("success")}>
              Show success snackbar
            </AddShoppingCartIcon>
          </IconButton>
        </div>
      </Box>
      {/* <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                        <Button onClick={() => addCart()}>Adicionar item ao carrinho</Button>
                    </Box> */}
    </Box>
  );
}
