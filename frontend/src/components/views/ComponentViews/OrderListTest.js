import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import Button from '@mui/material/Button'

function addOrder(oId, status, fromToken, fromAmount, toToken, toAmount, rewardBnb, time, txLink = '') {
  return {
    oId,
    status,
    fromToken,
    fromAmount,
    toToken,
    toAmount,
    rewardBnb,
    time,
    txLink,
  }
}

export const rows = [
  addOrder(
    0,
    'Completed',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '12',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    1,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '450',
    '2021-12-02',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    2,
    'Completed',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '460',
    '2021-12-03',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    3,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-04',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    4,
    'Completed',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-05',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    5,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    6,
    'Completed',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    7,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    8,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    9,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    10,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    11,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    12,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    13,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    14,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    15,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    16,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    17,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    18,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    19,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    20,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    21,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    22,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    23,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    24,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    25,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    26,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    27,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    28,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    29,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    30,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    31,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    32,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    33,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    34,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    35,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    36,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    37,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
  addOrder(
    38,
    'Pending',
    'BNB',
    '0.1',
    'BTC',
    '0.1',
    '0.1',
    '2021-12-01',
    'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
  ),
]
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

const MakerOrderHeadCells = [
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'swap',
    numeric: false,
    disablePadding: true,
    label: 'Swap',
  },
  {
    id: 'from',
    numeric: false,
    disablePadding: false,
    label: 'From Token',
  },
  {
    id: 'to',
    numeric: false,
    disablePadding: false,
    label: 'To Token',
  },
  {
    id: 'rewardBnb',
    numeric: true,
    disablePadding: false,
    label: 'Reward BNB',
  },
  {
    id: 'ratio',
    numeric: true,
    disablePadding: false,
    label: 'Ratio',
  },
  {
    id: 'txLink',
    numeric: true,
    disablePadding: false,
    label: 'Tx Link',
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {MakerOrderHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

// const EnhancedTableToolbar = (props) => {
// 	const { numSelected } = props;

// 	return (
// 		<Toolbar
// 			sx={{
// 				pl: { sm: 2 },
// 				pr: { xs: 1, sm: 1 },
// 				...(numSelected > 0 && {
// 					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
// 				}),
// 			}}>
// 			{numSelected > 0 ? (
// 				<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
// 					{numSelected} selected
// 				</Typography>
// 			) : (
// 				<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
// 					Orders
// 				</Typography>
// 			)}

// 			{numSelected > 0 ? (
// 				<Tooltip title='Delete'>
// 					<IconButton>
// 						<DeleteIcon />
// 					</IconButton>
// 				</Tooltip>
// 			) : (
// 				<Tooltip title='Filter list'>
// 					<IconButton>
// 						<FilterListIcon />
// 					</IconButton>
// 				</Tooltip>
// 			)}
// 		</Toolbar>
// 	);
// };

// EnhancedTableToolbar.propTypes = {
// 	numSelected: PropTypes.number.isRequired,
// };

export function EnhancedTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  // const handleClick = (event, name) => {
  // 	const selectedIndex = selected.indexOf(name);
  // 	let newSelected = [];

  // 	if (selectedIndex === -1) {
  // 		newSelected = newSelected.concat(selected, name);
  // 	} else if (selectedIndex === 0) {
  // 		newSelected = newSelected.concat(selected.slice(1));
  // 	} else if (selectedIndex === selected.length - 1) {
  // 		newSelected = newSelected.concat(selected.slice(0, -1));
  // 	} else if (selectedIndex > 0) {
  // 		newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  // 	}

  // 	setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage)
  }

  // onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  const handleChangeLeft = (page) => {
    setPage(page - 1)
  }
  const handleChangeRight = (page) => {
    setPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const handleChangeDense = (event) => {
  // 	setDense(event.target.checked);
  // };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '0px 10px 0 10px' }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            //  size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.oId}
                      sx={{}}
                      // selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.status}
                      </TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>
                        Swap
                        {' '}
                        {row.fromToken}
                        {' '}
                        to
                        {row.toToken}
                      </TableCell>
                      <TableCell>
                        {row.fromAmount}
                        {' '}
                        {row.fromToken}
                      </TableCell>
                      <TableCell>
                        {row.toAmount}
                        {' '}
                        {row.toToken}
                      </TableCell>
                      <TableCell>
                        {row.rewardBnb}
                        {' '}
                        BNB
                      </TableCell>
                      <TableCell>{row.toAmount / row.fromAmount}</TableCell>
                      <TableCell onClick={() => window.open(row.txLink, '_blank')}>Tx Link</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={
                    { height: 53 * emptyRows }
                    // 	{
                    // 	height: (dense ? 33 : 53) * emptyRows,
                    // }
                  }
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          // rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={`showing ${page * 10 + 1} to ${
            page * 10 + 10 > rows.length ? rows.length : page * 10 + 10
          } of ${rows.length} entries`}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: 'flex',
            '& .MuiToolbar-root': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              // '& .MuiTablePagination-actions': { background: 'blue' },
            },
            '& .MuiTablePagination-selectLabel': { margin: '30px 0' },
            '& .MuiTablePagination-spacer': { display: 'none' },
            '& .MuiTablePagination-selectIcon': { display: 'none' },
            '& .MuiTablePagination-select': { display: 'none' },
            '& .MuiTablePagination-displayedRows': { display: 'none' },
            '& .MuiTablePagination-actions': {
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: '10px',
              '& .MuiButtonBase-root': {
                border: '1px solid gray',
                display: 'flex',
                // justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderRadius: '0',
              },
            },
          }}
          // sx={{ '& .MuiTablePagination-selectLabel': { color: 'red' } }}
        />
      </Paper>
      <Button onClick={handleChangeLeft}>test</Button>

      {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' /> */}
    </Box>
  )
}
