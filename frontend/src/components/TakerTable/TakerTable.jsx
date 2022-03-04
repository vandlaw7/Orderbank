import { CircularProgress, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import uuid from 'short-uuid'
import { TokenContracts } from '../../config/Contracts'
import { useApi } from '../../hooks/useApi'
import { GreenBox, RedBox } from '../../images'
import { setTakerConfirmOpen } from '../../modules/dialog/actions'
import { setFromToToken, setOid, setPaths, setProfit, setProtocols } from '../../modules/takeorder/actions'
import { getBlockNumber, getRemainTime } from '../../utils'
import ModalFilter from '../modal/ModalFilter'
import './TakerTable.css'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'availability',
    numeric: false,
    disablePadding: true,
    label: 'Availability',
  },
  {
    id: 'profit',
    numeric: true,
    disablePadding: false,
    label: 'Profit',
  },
  {
    id: 'fromToken',
    numeric: true,
    disablePadding: false,
    label: 'From Token',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: '',
  },
  {
    id: 'toToken',
    numeric: true,
    disablePadding: false,
    label: 'To Token',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
]
/**
 * 테이블 헤드
 */
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <span className="table_font">{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}

export function TakerTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(11)
  const [rows, setRows] = React.useState([])
  const dispatch = useDispatch()
  const [currentBlock, setCurrentBlock] = React.useState(0)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const { getOrder } = useApi()
  const getTakerOrders = React.useCallback(async (offset, limit) => {
    const orderArr = await getOrder(0, 10, 0, true)
    setRows(orderArr)
  }, [getOrder])
  const getCurrentBlock = React.useCallback(async () => {
    const blockNumber = await getBlockNumber()
    setCurrentBlock(blockNumber)
  }, [])
  React.useEffect(() => {
    getTakerOrders(0, 10)
    getCurrentBlock()
  }, [])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const openTakerConfirmDialog = React.useCallback((oid, path, protocols, profit, fromToToken) => {
    dispatch(setOid(oid))
    dispatch(setPaths(path))
    dispatch(setProtocols(protocols))
    dispatch(setProfit(profit))
    dispatch(setFromToToken(fromToToken))
    dispatch(setTakerConfirmOpen(true))
  }, [dispatch])

  return (
    <Box sx={{ marginRight: '5%', marginLeft: '5%', marginTop: '5%' }}>
      {rows.length > 0 && (
        <div className="header-page" style={{ marginBottom: '2rem' }}>
          <span className="header-name">Transactions</span>
          <ModalFilter />
        </div>
      )}
      {rows.length === 0 && (
        <Box sx={{ marginLeft: '50%', marginRight: '50%', justifyContent: 'space-between' }}>
          <CircularProgress />
        </Box>
      )}
      {rows.length > 0
      && (
        <Paper sx={{ width: '100%', mb: 2, backgroundColor: 'transparent' }}>
          <TableContainer>
            <Table
              aria-label="a dense table"
              sx={{ minWidth: 1200, minHeight: 600 }}
              size="small"
            >
              <EnhancedTableHead
                numSelected={0}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        style={{ height: 10 }}
                        onClick={() => openTakerConfirmDialog(
                          row.id.hex,
                          row.path,
                          row.protocols,
                          row.profit,
                          `${TokenContracts[row.fromToken]} >> ${TokenContracts[row.toToken]}`,
                        )}
                        role="checkbox"
                        tabIndex={-1}
                        key={`${uuid.generate()}-trades`}
                      >
                        <TableCell
                          className="table_font"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.availability && (
                            <>
                              <img src={GreenBox} alt='green box'/>
                              <span>Available</span>
                            </>
                          )}
                          {!row.availability && (
                            <>
                              <img src={RedBox} alt='red box'/>
                              <span>Unavailable</span>
                            </>
                          )}
                        </TableCell>
                        <TableCell className="table_font" align="right">
                          <Typography color={Number(row.profit) > 0 ? 'red' : 'blue'}>
                            {Number(row.profit).toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits:4 })}
                          </Typography>
                        </TableCell>
                        <TableCell className="table_font" align="right">{TokenContracts[row.fromToken]}</TableCell>
                        <TableCell className="table_font" align="right">
                        0.01
                          {TokenContracts[row.fromToken]}
                          {' '}
                        ~ 0.01
                          {TokenContracts[row.toToken]}
                        </TableCell>
                        <TableCell className="table_font" align="right">{TokenContracts[row.toToken]}</TableCell>
                        <TableCell className="table_font" align="right">
                          {getRemainTime(Number(row.time.hex))}
                          {' '}
                        ago
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </TableContainer>
          <TablePagination
            style={{ color: 'white' }}
            rowsPerPageOptions={[]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  )
}
