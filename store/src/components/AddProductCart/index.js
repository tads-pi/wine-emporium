import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";


export function AddProductCart() {
    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        addCart();
        enqueueSnackbar(
          <Typography>Vinho adicionado adicionado ao carrinho.</Typography>,
          {variant}
        );
      };

    return (
        <IconButton
            color="primary"
            aria-label="add to shopping cart"
            style={{ position: "relative", bottom: "5px" }}
          >
            <AddShoppingCartIcon onClick={handleClickVariant("success")}>
              Show success snackbar
            </AddShoppingCartIcon>
          </IconButton>
    )
}