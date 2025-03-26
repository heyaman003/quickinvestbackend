import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaginationTable = ({
  columns,
  rows,
  perPageShow,
  tableHeight,
  className,
  data,
  level,
  pageNo,
  searchId,
  date,
  pagePerShow,
  setPagePerShow,
  setPageNo,
  isCustomPagination,
}) => {
  const [, setPageShow] = useSearchParams();

  const [rowsPerPage, setRowsPerPage] = React.useState(perPageShow);
  useEffect(() => {
    setPageShow({ page: 1 });
    setPageNo(1);
  }, [searchId, date, level]);

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
            {rows?.map((row, i) => (
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
                disabled={data?.hasPrevPage === false}
                onClick={() => {
                  pageNo && setPageNo((prev) => prev - 1);
                  pagePerShow && setPageShow({ page: pageNo - 1 });
                }}
                style={{
                  border: "none",
                  padding: "5px 10px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  background: "#1a73e8",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >{`Prev`}</button>
              <button
                disabled={data?.hasNextPage === false}
                onClick={() => {
                  pageNo && setPageNo((prev) => prev + 1);
                  pagePerShow && setPageShow({ page: pageNo + 1 });
                }}
                style={{
                  border: "none",
                  padding: "5px 10px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  background: "#1a73e8",
                  color: "#fff",
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
              {data?.page} out of {data?.totalPages}
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
          rowsPerPageOptions={[5]}
          component="div"
          count={data?.totalDocs !== undefined ? data?.totalDocs : 0}
          rowsPerPage={rowsPerPage}
          className="materialTablePagination"
        />
      )}
    </>
  );
};

export default PaginationTable;
