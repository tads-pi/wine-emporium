import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatCurrency } from '../../utils/formatCurrency';
import { PreviwProductTable } from '../PreviewProductTable';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cart, Product } from '../../zustand/types';
import { FALLBACK_IMAGE_URL } from '../../config/images';
import { IconButton } from '@mui/material';
import useCartCheckout from '../StepCheckout/useCartCheckout';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type TableItemsCheckoutProps = {
  cart: Cart;
  onAddProduct: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
};


  // createData(<PreviwProductTable />, formatCurrency(356), 16.0, formatCurrency(49), <DeleteIcon color='error' />),

  export function TableItemsCheckout({
    cart,
    onAddProduct,
    onRemoveProduct,
  }: TableItemsCheckoutProps) {
    function getImage(product: Product) {
      if (product?.images.length > 0) {
        const [markedImage] = product?.images.filter((img) => img.marked);
        if (markedImage) {
          return markedImage.url;
        }
        return product?.images[0].url;
      } else {
        return FALLBACK_IMAGE_URL;
      }
    }
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produto</StyledTableCell>
              <StyledTableCell align="left">Preço</StyledTableCell>
              <StyledTableCell align="left">Quantidade</StyledTableCell>
              <StyledTableCell align="left">Preço total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <PreviwProductTable
                    img={getImage(row)}
                    nameProduct={row.name}
                    descriptionProduct={row.description}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{formatCurrency(row.price)}</StyledTableCell>
  
                <StyledTableCell align="center">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <div>
                      <IconButton
                        aria-label="remove uma unidade do carrinho"
                        size="small"
                        onClick={() => onRemoveProduct(row.id)}
                        style={{
                          backgroundColor: 'lightcoral',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                        }}
                      >
                        -
                      </IconButton>
                    </div>
                    <div>{row.amount}</div>
                    <div>
                      <IconButton
                        aria-label="adiciona uma unidade ao carrinho"
                        size="small"
                        onClick={() => onAddProduct(row.id)}
                        style={{
                          backgroundColor: 'lightgreen',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                        }}
                      >
                        +
                      </IconButton>
                    </div>
                  </div>
                </StyledTableCell>
  
                <StyledTableCell align="left">{formatCurrency(row.price * row.amount)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }