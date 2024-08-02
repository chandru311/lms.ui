import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
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
} from "reactstrap";
import * as Yup from "yup";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaFileExcel, FaFilePdf, FaDownload } from "react-icons/fa";
import ReactSelect from "react-select";
import SelectStyle from "../../../Common/common/SelectStyle";
import Loader from "../../../Common/components/Loader";
import TableContainer from "../../../Common/components/TableContainer";
import { getApiData, postApiData } from "../../../Common/helpers/axiosHelper";

const validationSchema = Yup.object().shape({
  employee: Yup.string().required("Employee name is required"),
  department: Yup.string().required("Department is required"),
  fromDate: Yup.date().required("From Date is required"),
  toDate: Yup.date()
    .required("To Date is required")
    .min(Yup.ref("fromDate"), "To Date must be later than From Date"),
});

const Reports = () => {
  const [state, setState] = useState({
    employee: "",
    reports: [],
    isLoading: false,
    dropdownOpen: false,
    employeeOptions: [],
  });

  const toggleDropdown = () =>
    setState((prev) => ({ ...prev, dropdownOpen: !state.dropdownOpen }));

  const handleSubmit = (values, { resetForm }) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, reports: [...state.reports, values] }));
      setState((prev) => ({ ...prev, isLoading: false }));

      resetForm();
    }, 1000);
  };

  const fetchReports = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await getApiData("api/LeaveReport/GetReports");
      setState((prev) => ({ ...prev, isLoading: false }));

      const mappedResponse = response.data.map((data) => ({
        fromDate: data.fromDate,
        toDate: data.toDate,
        active: data.active,
      }));

      setState((prev) => ({ ...prev, reports: mappedResponse }));
    } catch (error) {
      console.error(error);
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
      Header: "Employee",
      accessor: "employee",
    },
    {
      Header: "From Date",
      accessor: "fromDate",
    },
    {
      Header: "To Date",
      accessor: "toDate",
    },
  ];

  const data = state.reports.map((report) => ({
    employee: report.employee,
    fromDate: new Date(report.fromDate).toLocaleDateString(),
    toDate: new Date(report.toDate).toLocaleDateString(),
  }));

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Reports");
    writeFile(wb, "reports.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Employee", "From Date", "To Date"]],
      body: data.map((item) => [item.employee, item.fromDate, item.toDate]),
    });
    doc.save("reports.pdf");
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={12}>
          <h2 className="mb-4">Leave Reports</h2>
          <Formik
            initialValues={{
              employee: "",
              department: "",
              fromDate: "",
              toDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="employee">Employee</Label>
                      <Field name="employee">
                        {({ field, form }) => {
                          const hasError =
                            form.errors.employee && form.touched.employee;
                          return (
                            <ReactSelect
                              {...field}
                              options={state.employeeOptions}
                              styles={SelectStyle}
                              value={state.employeeOptions.find(
                                (option) => option.value === values.employee
                              )}
                              onChange={(option) =>
                                setFieldValue(
                                  "employee",
                                  option ? option.value : ""
                                )
                              }
                              onBlur={() =>
                                form.setFieldTouched("employee", true)
                              }
                              onInputChange={(inputValue) => {
                                if (inputValue.length >= 3) {
                                  fetchEmployees(inputValue);
                                }
                              }}
                              invalid={hasError}
                            />
                          );
                        }}
                      </Field>
                      {touched.employee && errors.employee ? (
                        <div className="text-danger">{errors.employee}</div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col md={3}>
                    <FormGroup>
                      <Label for="fromDate">From Date</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="fromDate"
                        id="fromDate"
                        invalid={touched.fromDate && !!errors.fromDate}
                      />
                      {touched.fromDate && errors.fromDate ? (
                        <div className="text-danger">{errors.fromDate}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="toDate">To Date</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="toDate"
                        id="toDate"
                        invalid={touched.toDate && !!errors.toDate}
                      />
                      {touched.toDate && errors.toDate ? (
                        <div className="text-danger">{errors.toDate}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <div className="d-inline-block mt-8">
                      <Button
                        style={{
                          background: "#5e2ced",
                          border: "none",
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
                          }}
                        >
                          <FaDownload />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={downloadExcel}
                            className="d-flex align-items-center"
                          >
                            <FaFileExcel className="mr-1 text-green-700" />
                            <span>Excel</span>
                          </DropdownItem>
                          <DropdownItem
                            onClick={downloadPDF}
                            className="d-flex align-items-center"
                          >
                            <FaFilePdf className="mr-1 text-red-500" />
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
              <h4 className="mt-4">Report List</h4>
            </CardTitle>
            {state.isLoading ? (
              <Loader />
            ) : (
              <div>
                <TableContainer
                  columns={columns}
                  data={data}
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

// <Col md={3}>
//                     <FormGroup>
//                       <Label for="department">Department</Label>
//                       <Field name="department">
//                         {({ field, form }) => (
//                           <ReactSelect
//                             {...field}
//                             options={[
//                               { value: "", label: "Select department" },
//                               { value: "sales", label: "Sales" },
//                               { value: "hr", label: "HR" },
//                               { value: "finance", label: "Finance" },
//                               { value: "marketing", label: "Marketing" },
//                             ]}
//                             styles={SelectStyle}
//                             onChange={(option) =>
//                               form.setFieldValue(field.name, option.value)
//                             }
//                             onBlur={() =>
//                               form.setFieldTouched(field.name, true)
//                             }
//                             isInvalid={
//                               form.touched.department &&
//                               !!form.errors.department
//                             }
//                           />
//                         )}
//                       </Field>
//                       {touched.department && errors.department ? (
//                         <div className="text-danger">{errors.department}</div>
//                       ) : null}
//                     </FormGroup>
//                   </Col>
