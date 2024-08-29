import React, { useState, useEffect } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import * as Yup from "yup";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaDownload } from "react-icons/fa";
import ReactSelect from "react-select";
import Loader from "../../../Common/components/Loader";
import TableContainer from "../../../Common/components/TableContainer";
import axios, {
  getApiData,
  postApiData,
} from "../../../Common/helpers/axiosHelper";
import logo from "../../../assets/ai4soln-logo.png";
import SelectStyle from "../../../Common/common/SelectStyle";
import { mapStatus } from "../../../Common/common/StatusLabels";
import "../../../Common/common/status.css";

const Reports = () => {
  const [state, setState] = useState({
    employee: "",
    // startDate: "",
    //endDate: "",
    reports: [],
    isLoading: false,
    employeeOptions: [],
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);

  const toggleDropdown = () =>
    setState((prev) => ({ ...prev, dropdownOpen: !state.dropdownOpen }));

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async (values) => {
      setSelectedEmployee(values.employeeName);

      try {
        //setState((prev) => ({ ...prev, isLoading: true }));
        const response = await axios.get(
          `api/LeaveReport/GetReports?uId=${values.employeeName}&startDate=${values.startDate}&endDate=${values.endDate}`
        );

        const reports = response.data;
        if (Array.isArray(reports)) {
          setState((prev) => ({ ...prev, reports, isLoading: false }));
        }
      } catch (error) {
        console.error(error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
  });

  const fetchReports = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await getApiData("api/LeaveReport/GetReports");
      const reports = Array.isArray(response.data) ? response.data : [];
      const mappedResponse = reports.map((data) => {
        const firstName = data.firstName || "";
        const middleName = data.middleName || "";
        const lastName = data.lastName || "";

        const employeeName = [firstName, middleName, lastName]
          .filter((name) => name)
          .join(" ");

        return {
          employee: employeeName,
          employeeId: data.uId,
          departmentName: data.departmentName || "N/A",
          email: data.email || "N/A",
          startDate: data.startDate,
          endDate: data.endDate,
          leaveTypeName: data.leaveTypeName,
          reviewedBy: data.reviewedBy,
          status: mapStatus(data.status),
        };
      });
      setState((prev) => ({
        ...prev,
        reports: mappedResponse,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching reports:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };
  const fetchEmployees = async (inputValue) => {
    const Employees = {
      pageNumber: 1,
      pageCount: 50,
      filterColumns: [
        {
          columnName: "firstName",
          filterValue: inputValue,
          filterType: 6,
        },
      ],
    };

    try {
      const response = await postApiData(
        "api/Employee/GetEmployeeByPagination",
        Employees
      );

      const mappedResponse = response.model.map((data) => ({
        label: data.firstName + data.middleName + data.lastName,
        value: data.employeeId,
        departmentName: data.departmentName || "N/A",
        email: data.email || "N/A",
      }));
      setState((prev) => ({ ...prev, employeeOptions: mappedResponse }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const columns = [
    {
      Header: "Employee Name",
      accessor: "employee",
    },
    {
      Header: "Leave Type",
      accessor: "leaveTypeName",
    },
    {
      Header: "From Date",
      accessor: "startDate",
    },
    {
      Header: "To Date",
      accessor: "endDate",
    },
    {
      Header: "Approved By",
      accessor: "reviewedBy",
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        return (
          <Badge className={`font-size-11 badge-${value.color}`}>
            {value.label}
          </Badge>
        );
      },
    },
  ];

  const filteredReports = selectedEmployee
    ? state.reports.filter((report) => report.employeeId === selectedEmployee)
    : state.reports;

  const downloadExcel = () => {
    const data = state.reports.map((report) => ({
      EmployeeName: report.employee,
      FromDate: new Date(report.startDate).toLocaleDateString(),
      ToDate: new Date(report.endDate).toLocaleDateString(),
      Status: report.status.label,
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Reports");
    writeFile(wb, "reports.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add logo to the PDF
    const imgWidth = 20;
    const imgHeight = 10;
    doc.addImage(logo, "PNG", 10, 10, imgWidth, imgHeight);

    // Title in center of the page
    doc.setFontSize(18);
    doc.text("Leave Report-2024", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add an overall page border
    doc.setLineWidth(0.4);
    doc.rect(
      5,
      5,
      doc.internal.pageSize.getWidth() - 10,
      doc.internal.pageSize.getHeight() - 10
    );

    // Line between logo and employee details
    doc.setLineWidth(0.3);
    doc.line(5, 30, doc.internal.pageSize.getWidth() - 5, 30);

    const { startDate, endDate } = formik.values;
    const employeeDetails = selectedEmployeeDetails;

    doc.setFontSize(11);

    // Define positions and dimensions for the employee details
    const margin = 5;
    const empBorderX = 10 + margin;
    const empBorderY = 30 + margin;
    const empBorderWidth = doc.internal.pageSize.getWidth() - (20 + margin * 2);
    const empBorderHeight = 35;

    // Draw each detail text
    doc.text(
      `Employee Name: ${employeeDetails.label}`,
      20 + margin,
      40 + margin
    );

    doc.text(
      `Department: ${employeeDetails.departmentName}`,
      100 + margin,
      40 + margin
    );
    doc.text(
      `From Date: ${new Date(startDate).toLocaleDateString()}`,
      20 + margin,
      50 + margin
    );
    doc.text(
      `To Date: ${new Date(endDate).toLocaleDateString()}`,
      100 + margin,
      50 + margin
    );
    doc.text(`Email: ${employeeDetails.email}`, 20 + margin, 60 + margin);

    // Draw border around employee details
    doc.setLineWidth(0.3);
    doc.rect(empBorderX, empBorderY, empBorderWidth, empBorderHeight);

    // Adjust starting Y position for the table to ensure alignment
    const tableStartY = empBorderY + empBorderHeight + 10;

    // Table for filtered reports
    doc.autoTable({
      head: [
        [
          "Employee Name",
          "Leave Type",
          "From Date",
          "To Date",
          "Approved By",
          "Status",
        ],
      ],
      body: filteredReports.map((report) => [
        report.employee,
        report.leaveTypeName,
        new Date(report.startDate).toLocaleDateString(),
        new Date(report.endDate).toLocaleDateString(),
        report.reviewedBy,
        {
          content: report.status.label,
          styles: {
            textColor:
              report.status.color === "success"
                ? "green"
                : report.status.color === "warning"
                ? "orange"
                : report.status.color === "danger"
                ? "red"
                : "black",
          },
        },
      ]),
      startY: tableStartY,
      theme: "grid",
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [10, 10, 10],
      },
      styles: { lineColor: [0, 0, 0], lineWidth: 0.1 },
      margin: { top: 10 },
    });

    // Save the PDF with the selected employee's name
    doc.save(`${employeeDetails.label}.pdf`);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={12}>
          <Formik
            initialValues={formik.initialValues}
            onSubmit={formik.handleSubmit}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="employee">Employee</Label>
                      <Field name="employee">
                        {({ field, form }) => {
                          return (
                            <ReactSelect
                              {...field}
                              options={state.employeeOptions}
                              styles={SelectStyle}
                              value={selectedEmployeeDetails}
                              onChange={(selectedOption) => {
                                formik.setFieldValue(
                                  "employeeName",
                                  selectedOption ? selectedOption.value : ""
                                );
                                setSelectedEmployeeDetails(selectedOption);
                              }}
                              onBlur={() =>
                                form.setFieldTouched("employeeName", true)
                              }
                              onInputChange={(inputValue) => {
                                if (inputValue.length >= 3) {
                                  fetchEmployees(inputValue);
                                }
                              }}
                            />
                          );
                        }}
                      </Field>
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label for="fromDate">From Date</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="startDate"
                        id="fromDate"
                        onChange={formik.handleChange}
                        value={formik.values.startDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="toDate">To Date</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="endDate"
                        id="toDate"
                        onChange={formik.handleChange}
                        value={formik.values.endDate}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <div className="d-inline-block ">
                      <Button
                        style={{
                          background: "#5e2ced",
                          border: "none",
                          marginRight: "10px",
                          marginTop: "30px",
                        }}
                        type="submit"
                        disabled={state.isLoading}
                        className="mr-2"
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="d-inline-block">
                      <Dropdown
                        isOpen={state.dropdownOpen}
                        toggle={toggleDropdown}
                      >
                        <DropdownToggle
                          style={{
                            background: "green",
                            color: "white",
                            marginTop: "30px",
                          }}
                        >
                          <FaDownload />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={downloadExcel}
                            className="d-flex align-items-center"
                          >
                            <FaFileExcel style={{ color: "green" }} />
                            <span>Excel</span>
                          </DropdownItem>
                          <DropdownItem
                            onClick={downloadPDF}
                            className="d-flex align-items-center"
                          >
                            <FaFilePdf style={{ color: "red" }} />
                            <span>PDF</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <CardBody>
            <CardTitle>
              <h4 className="mt-4">Leave Reports</h4>
            </CardTitle>
            {state.isLoading ? (
              <Loader />
            ) : (
              <div>
                <TableContainer
                  columns={columns}
                  data={filteredReports}
                  isGlobalFilter={true}
                  isAddOptions={false}
                  customPageSize={10}
                  isPageSelect={false}
                />
              </div>
            )}
          </CardBody>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
