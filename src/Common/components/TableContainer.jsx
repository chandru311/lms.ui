import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import {
  Table,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import JobListGlobalFilter from "./GlobalSearchFilter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
//import 'boxicons';

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <React.Fragment>
      <Col md={4}>
        <div className=" me-xxl-2 mb-3 my-xxl-0 ">
          <div className="position-relative">
            <div className="d-flex mt-3">
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder={`search records...`}
                value={value || ""}
                // Added style for padding
                style={{ paddingLeft: "30px " }}
              />
            </div>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
  customId,
  desc,
  onPageChange,
  totalPage,
  totalRecord,
  currentPage,
  goToPage,
  clearFilters,
  pageSizeOptions,
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 100];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        //Madhangi - commented to fix sorting issue
        // sortBy: [
        //   {
        //     id: customId,
        //     desc: desc,
        //   },
        // ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
    if (onPageChange) {
      onPageChange(Number(event.target.value), currentPageNumber);
    }
  };

  const onInputChange = (e) => {
    e.preventDefault();
    const newPage = e.target.value;
    const adjustedPage = newPage > totalPage ? totalPage : newPage;
    setCurrentPageNumber(adjustedPage);
    onPageChange(pageSize, adjustedPage);
  };

  useEffect(() => {
    if (clearFilters) {
      setPageSize(PAGE_SIZE_OPTIONS[0]);
    }
  }, [clearFilters]);

  useEffect(() => {
    setCurrentPageNumber(currentPage);
  }, [currentPage]);

  return (
    <Fragment>
      <Row className="mb-2">
        {pageSizeOptions ? null : (
          <Col md={customPageSizeOptions ? 2 : 2}>
            <select
              className="form-select ms-2 mt-3"
              value={pageSize}
              onChange={onChangeInSelect}
              aria-label="pagesize"
            >
              {PAGE_SIZE_OPTIONS.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
        {totalRecord !== null && totalPage !== null && currentPage && (
          <Col>
            <div className="mt-2 d-flex flex-wrap gap-3">
              <p>Total Records = {totalRecord}</p>
              <p>Total Pages = {totalPage}</p>
              <p>Current Page = {currentPage}</p>
            </div>
          </Col>
        )}
        {/* {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )} */}
      </Row>
      {/* style={{ maxHeight: '650px', overflowY: 'auto' }} */}
      {data.length > 0 ? (
        <div className="table-responsive react-table">
          <Table
            bordered
            hover
            {...getTableProps()}
            className={className}
            style={{ border: "3px solid #ddd", paddingLeft: "10 px" }}
          >
            <thead className="table-light table-nowrap">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      key={column.id}
                      style={{
                        width: `${100 / headerGroup.headers.length}%`,
                        maxWidth: "150px",
                        whiteSpace:
                          columnIndex === headerGroup.headers.length - 1
                            ? "nowrap"
                            : "normal",
                      }}
                    >
                      <div className="mb-2" {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {generateSortingIndicator(column)}
                      </div>
                      {/* <Filter column={column} /> */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                          style={{
                            width: `${100 / row.cells.length}%`,
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace:
                              cellIndex === row.cells.length - 1
                                ? "nowrap"
                                : "normal",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-sm-center fs-5">No Data Found</div>
      )}
      <div className="d-flex justify-content-between align-iems-cener">
        <p className="mt-1 ms-2">
          Showing {pageSize > data.length ? data.length : pageSize} Results
        </p>
        {goToPage ? (
          <ul className="pagination pagination-rounded justify-content-end mb-2">
            <div className="d-flex align-items-center me-1">
              <p className="me-2 mb-0">Goto Page :</p>
              <Input
                type="text"
                aria-label="currentPageNumber"
                value={currentPageNumber}
                style={{
                  width: "40px",
                  height: "29px",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
                onChange={onInputChange}
                onBlur={onInputChange}
              />
            </div>
            <li
              className={
                currentPageNumber === 1 ? "page-item disabled" : "page-item"
              }
            >
              <Button
                color="primary"
                className="me-1"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  const newPageNumber = Math.max(currentPageNumber - 1, 1);
                  setCurrentPageNumber(newPageNumber);
                  onPageChange(pageSize, newPageNumber);
                }}
                aria-label="Previous"
                disabled={currentPageNumber === 1 ? true : false}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
              </Button>
            </li>
            <li
              className={
                currentPageNumber === totalPage
                  ? "page-item disabled"
                  : "page-item"
              }
              aria-label="Next"
            >
              <Button
                color="primary"
                className="me-1"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  const newPageNumber = Math.min(
                    currentPageNumber + 1,
                    totalPage
                  );
                  setCurrentPageNumber(newPageNumber);
                  onPageChange(pageSize, newPageNumber);
                }}
                aria-label="next"
                disabled={currentPageNumber === totalPage ? true : false}
              >
                <FontAwesomeIcon icon={faArrowRight} className="fa-lg" />
              </Button>
            </li>
          </ul>
        ) : (
          <ul className="pagination pagination-rounded justify-content-end mb-2">
            <li
              className={!canPreviousPage ? "page-item disabled" : "page-item"}
            >
              {!canPreviousPage ? null : (
                <Button
                                      color="primary"
                                   
                  className="me-1 mt-1 mb-1"
                  size="sm"
                  onClick={previousPage}
                  aria-label="Previous"
                  disabled={!canPreviousPage ? true : false}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
                </Button>
              )}
            </li>
            {[...Array(pageCount)].map((_, index) => {
              if (
                index === 0 ||
                index === pageIndex ||
                index === pageCount - 1 ||
                (index >= pageIndex - 1 && index <= pageIndex + 1)
              ) {
                return (
                  <li
                    key={index}
                    className={pageIndex === index ? "active" : ""}
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => gotoPage(index)}
                    >
                      {index + 1}
                    </Link>
                  </li>
                );
              } else if (index === 1 || index === pageCount - 2) {
                return (
                  <li key={index} style={{ marginTop: "6px" }}>
                    ...
                  </li>
                );
              }
              return null;
            })}
            <li
              className={!canNextPage ? "page-item disabled" : "page-item"}
              aria-label="Next"
            >
              {!canNextPage ? null : (
                <Button
                                      color="primary"
                                    
                  className="me-1 mt-1 mb-1"
                  size="sm"
                  onClick={nextPage}
                  disabled={!canNextPage ? true : false}
                  aria-label="next"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="fa-lg" />
                </Button>
              )}
            </li>
          </ul>
        )}
      </div>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
