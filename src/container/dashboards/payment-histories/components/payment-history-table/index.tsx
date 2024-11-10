import { ChangeEvent, useEffect, useState } from 'react'
import { GetAllPaymentHistories, GetPaymentHistoriesByUser } from '../../../../../services/payment.service'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { IPayment } from '../../../../../types/interfaces/payment.interface'
import formatDate from '../../../../../utils/date'
import Pageheader from '../../../../../components/common/pageheader/pageheader'
import { columns } from '../../constant'
import checkAllowRole from '../../../../../lib/check-allow-role'
import ROLE from '../../../../../constants/role'
import useCurrentUser from '../../../../../hooks/use-current-user'

export default function PaymentHistoryTable() {
  const [paymentList, setPaymentList] = useState<IPayment[]>([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searching, setSearching] = useState("");
  const { user } = useCurrentUser();
  const isAllowRole = checkAllowRole(Number(user?.role), [ROLE.SUPER_ADMIN_PROFILE.id, ROLE.ADMIN_PROFILE.id, ROLE.STAFF_PROFILE.id])

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event)
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchPaymentList = async () => {
    if (user) {
      const res = isAllowRole ? await GetAllPaymentHistories() : await GetPaymentHistoriesByUser(user?._id)
      setPaymentList(res.data)
    }
  }

  useEffect(() => {
    fetchPaymentList()
  }, [user]);

  return (
    <div>
      <Pageheader
        currentpage="Payment Histories"
        activepage="Dashboards"
        mainpage="Payment Histories"
      />

      <div className="filter-container">
        <label htmlFor="search" className="form-label">
          Search payment histories
        </label>
        <input
          id="search"
          type="text"
          value={searching || ""}
          onChange={onSearch}
          className="form-control mb-4 border-2"
          placeholder="Search by title..."
          aria-labelledby="search"
        />
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {
                  columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentList.map(payment => (
                <TableRow key={payment._id} className="border border-inherit border-solid hover:bg-gray-100 dark:border-default border/10 dark:hover:bg-light">
                  <TableCell>{payment._id}</TableCell>
                  <TableCell>{payment.userID}</TableCell>
                  <TableCell>
                    <span className="text-green">+ {payment.amount} VND</span>
                  </TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{formatDate(payment.createdAt, 'DATE_WITH_TIME')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {paymentList.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No payments found.</p>
        )}

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={paymentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
