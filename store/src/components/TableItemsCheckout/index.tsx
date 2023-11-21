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
import DeleteIcon from '@mui/icons-material/Delete';

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

function createData(
  product: React.ReactNode,
  calories: number,
  fat: number,
  carbs: number,
  deleteProduct: React.ReactNode
) {
  return { product, calories, fat, carbs, deleteProduct };
}

const rows = [
  createData(<PreviwProductTable />, 19, 6.0, 24, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 237, 9.0, 37, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 262, 16.0, 24, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 305, 3.7, 67, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 356, 16.0, 49, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 159, 6.0, 24, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 237, 9.0, 37, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 262, 16.0, 24, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 305, 3.7, 67, <DeleteIcon color='error' />),
  createData(<PreviwProductTable />, 356, 16.0, 49, <DeleteIcon color='error' />),
];

interface TableItemsCheckoutProps {
  product: React.ReactNode
  price: number
  quantity: number
  priceTotal: number
  deleteProduct: React.ReactNode
}

export function TableItemsCheckout() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Produto</StyledTableCell>
            <StyledTableCell align="left">Preço</StyledTableCell>
            <StyledTableCell align="left">Quantidade</StyledTableCell>
            <StyledTableCell align="left">Preço total</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {row.product}
              </StyledTableCell>
              <StyledTableCell align="left">{row.calories}</StyledTableCell>
              <StyledTableCell align="left">{row.fat}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell align="center">{row.deleteProduct}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}