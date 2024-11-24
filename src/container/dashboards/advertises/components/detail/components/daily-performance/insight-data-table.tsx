import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ChangeEvent, memo, useState } from "react";
import Table from '@mui/material/Table';
import { columns } from "./constant";
import randomId from "../../../../../../../utils/random-id";
import isEqual from "react-fast-compare";
import { IResult, TCurrency } from "../../../../../../../types/advertise";
import formatDate from "../../../../../../../utils/date";
import { currencyFormat } from "../../../../../../../lib/currency-format";

interface Props {
  result: IResult[];
  currency: TCurrency;
}

const InsightDataTable = (props: Props) => {
  const { result, currency } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              result ? result
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={randomId()}>
                      <TableCell align="left">{formatDate(
                        row.date.toString(),
                        "DATE_WITH_TIME"
                      )}</TableCell>
                      <TableCell align="left">{row.impressions}</TableCell>
                      <TableCell align="right">{row.clicks}</TableCell>
                      <TableCell align="right">{currencyFormat(row.cpc)} {currency}</TableCell>
                      <TableCell align="right">{currencyFormat(row.cpm)} {currency}</TableCell>
                      <TableCell align="right">{currencyFormat(row.cost)} {currency}</TableCell>
                      <TableCell align="right">{row.ctr}%</TableCell>
                    </TableRow>
                  );
                }) : <>Loading...</>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default memo(InsightDataTable, isEqual);
