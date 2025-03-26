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

const CustomDataTable = ({
  columns,
  rows,
  perPageShow,
  tableHeight,
  className,

  totalData,
  pageNo,
  pagePerShow,
  setPagePerShow,
  setPageNo,
  isCustomPagination,
}) => {
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

  const handleChangePage = (_event, newPage) => {
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
      <TableContainer
        className={`${className}`}
        sx={{ maxHeight: tableHeight, width: "100%", maxWidth: "100%" }}
      >
        <Table stickyHeader aria-label="sticky table" className="materialTable">
          <TableHead className="materialTableHead">
            <TableRow className="materialTableRow">
              {columns.map((column, i) => (
                <TableCell
                  key={i + 50}
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
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => (
                <TableRow
                  className="materialTableBodyRow"
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={i + 100}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        className="materialTableBodyCell"
                        key={column.id}
                        align={column.align}
                      >
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

      {isCustomPagination ? (
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              <button
                disabled={pageNo === 1}
                onClick={() => setPageNo((prev) => prev - 1)}
                style={{
                  border: "none",
                  padding: "5px 10px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  background: "#FFC100",
                  color: "#000",
                  cursor: "pointer",
                }}
              >{`Prev`}</button>
              <button
                disabled={pageNo === Math.ceil(totalData / pagePerShow)}
                onClick={() => setPageNo((prev) => prev + 1)}
                style={{
                  border: "none",
                  padding: "5px 10px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  background: "#FFC100",
                  color: "#000",
                  cursor: "pointer",
                }}
              >{`Next`}</button>
            </div>
            <span
              style={{
                color: `--var(--text-p-black)`,
                marginRight: "10px",
                fontWeight: "500",
              }}
            >
              {pageNo} out of {Math.ceil(totalData / pagePerShow)}
            </span>
          </div>

          <div>
            <select
              onChange={(e) => {
                setPagePerShow(Number(e.target.value));
                setRowsPerPage(Number(e.target.value));
              }}
              defaultValue={`${pagePerShow}`}
              style={{
                padding: "6px 10px",
                fontSize: "13px",
                fontWeight: "600 !important",
                border: "1px solid gray",
                borderRadius: "5px",
                outline: "none",
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      ) : (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={rows?.length ? rows?.length : 0}
          rowsPerPage={perPageShow}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="materialTablePagination"
        />
      )}
    </>
  );
};

export default CustomDataTable;
