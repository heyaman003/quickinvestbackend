import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useReducer } from "react";
import { useSearchParams } from "react-router-dom";

const DataTable = ({ columns, rows, perPageShow, tableHeight, className }) => {
  const [pageShow, setPageShow] = useSearchParams();
  const pageTerm = pageShow.get("newPage") || "";
  const defaultValues = {
    pageShow: parseInt(pageTerm) ? parseInt(pageTerm) : 1,
  };

  const [page, setPage] = React.useState(
    parseInt(pageTerm) ? parseInt(pageTerm) : 0
  );

  const [searchValues, setSearchValues] = useReducer(
    (state, action) => ({ ...state, ...action }),
    defaultValues
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(perPageShow);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSearchValues({ pageShow: newPage });
    setPageShow({ newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPage(searchValues);
  };

  return (
    <>
      <TableContainer className={`${className}`} sx={{ maxHeight: tableHeight, width: "100%", maxWidth: "100%" }}>
        <Table stickyHeader aria-label="sticky table" className="materialTable">
          <TableHead className="materialTableHead">
            <TableRow className="materialTableRow">
              {columns.map((column, i) => (
                <TableCell
                  key={i+50}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="materialTableCell"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="materialTableBody">
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row,i) => (
              <TableRow className="materialTableBodyRow" hover role="checkbox" tabIndex={-1} key={i+100}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell className="materialTableBodyCell" key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={rows?.length ?rows?.length  : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="materialTablePagination"
      />
    </>
  );
};

export default DataTable;