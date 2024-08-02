import React, { useState, useMemo, useEffect } from "react";
import axios from "../../Common/helpers/axiosHelper.js";
import {
  Button,
  Card,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import "../../index.css";
import TableContainer from "../../Common/components/TableContainer.jsx";
import { edit, view, deactivate } from "../../Common/common/icons.js";
import AddManager from "./AddManager";
import AddDepartment from "./AddDepartment.jsx";
import AddEmployee from "./AddEmployee";
import EmpRegNav from "../pages/EmployeeReport/EmpRegNav.jsx";
import { getApiData } from "../../Common/helpers/axiosHelper.js";
import ViewEmployeeDetails from "./ViewEmployeeDetails.jsx";
import Loader from "../../Common/components/Loader.jsx";

const ManageCompany = (props) => {
  const [activeTab, setActiveTab] = useState("1"); // To handle active tab
  //newly added  start
  const [isLoading, setIsLoading] = useState(false);
  const { employeeData, setEmployeeData } = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [managerDetails, setManagerDetails] = useState([]);

  //newly added end
  const [isAddManagerModalOpen, setIsAddManagerModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  //newly added  start
  const [isViewEmployeeModalOpen, setIsViewEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  //newly added end

  const [managersData, setManagersData] = useState([
    {
      sno: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "HR",
      active: true,
    },
    {
      sno: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Finance",
      active: false,
    },
  ]);

  const [employeesData, setEmployeesData] = useState([
    {
      sno: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      department: "Marketing",
      active: true,
    },
    {
      sno: 2,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      department: "Sales",
      active: false,
    },
  ]);

  //newly added  start
  useEffect(() => {
    getEmployeeDetails();
    getManagerDetails();
  }, []);

  useEffect(() => {
    //    Fetch user role from props or state management solution
    setCurrentRole(props.userRole);
  }, [props.userRole]);
  // useEffect(()=>{
  //   getEmployeeDetails()
  // },[])
  const getEmployeeDetails = async () => {
    try {
      setIsLoading(true);
      console.log("entered");
      const response = await getApiData(`api/Employee/GetAllEmployees`);
      setIsLoading(false);
      const mappedResponse = response.data.map((item, index) => ({
        index: index + 1,
        sno: item.id,
        name: item.firstName,
        email: item.email,
        // email: item.userName,
        // department: item.departments,
        department: item.departments,

        //console.log("employee details "+response.data);
      }));
      setEmployeeDetails(mappedResponse || []);
      setIsLoading(false);
      console.log("employeedeatils" + employeeDetails);
    } catch (error) {
      // Error handling scenario
      console.error("Error fetching employee data:", error);
      // Implement additional error handling as needed (e.g., display an error message to the user)
    }
  };
  const getManagerDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getApiData("api/Manager/GetAllManagers");
      setIsLoading(false);
      const mappedResponse = response.data.map((item, index) => ({
        index: index + 1,
        sno: item.id,
        name: item.firstName,
        email: item.email,
        // email: item.userName,
        department: item.department,
      }));
      setManagerDetails(mappedResponse || []);
      setIsLoading(false);
      console.log("Manager Details" + managerDetails);
    } catch (error) {
      console.log("Error fetching Manager data:", error);
    }
  };
  // }
  const toggleViewEmployeeModal = () =>
    setIsViewEmployeeModalOpen(!isViewEmployeeModalOpen);

  //newly added end

  const toggleAddManagerModal = () =>
    setIsAddManagerModalOpen(!isAddManagerModalOpen);
  const toggleAddDepartmentModal = () =>
    setIsAddDepartmentModalOpen(!isAddDepartmentModalOpen);
  const toggleAddEmployeeModal = () =>
    setIsAddEmployeeModalOpen(!isAddEmployeeModalOpen);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const managerColumns = useMemo(
    () => [
      {
        Header: "SNO",
        accessor: "sno",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Department",
        accessor: "department",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Actions",
        disableFilters: true,
        accessor: "actions",
        Cell: (cellProps) => (
          <React.Fragment>
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              title="View"
              style={{ marginRight: "5px" }}
              aria-label="view"
            >
              {view()}
            </Button>

            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              title="Edit"
              style={{ marginRight: "5px" }}
            >
              {edit()}
            </Button>

            <Button
              type="button"
              color="danger"
              className="btn-sm btn-rounded"
              title="Deactivate"
              style={{ marginRight: "5px" }}
            >
              {deactivate()}
            </Button>
          </React.Fragment>
        ),
      },
    ],
    []
  );

  // Columns for Employee Table
  const employeeColumns = useMemo(
    () => [
      {
        Header: "SNO",
        accessor: "sno",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Department",
        accessor: "department",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "Actions",
        disableFilters: true,
        accessor: "actions",
        Cell: (cellProps) => (
          <React.Fragment>
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              title="View"
              style={{ marginRight: "5px" }}
              aria-label="view"
            >
              {view()}
            </Button>

            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              title="Edit"
              style={{ marginRight: "5px" }}
            >
              {edit()}
            </Button>

            <Button
              type="button"
              color="danger"
              className="btn-sm btn-rounded"
              title="Deactivate"
              style={{ marginRight: "5px" }}
            >
              {deactivate()}
            </Button>
          </React.Fragment>
        ),
      },
    ],
    []
  );

  return (
    //newly added start
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container fluid>
            <div className="page-title-box p-4">
              <h4 className="mb-sm-0 font-size-18">Manage Company</h4>
            </div>
            <Card>
              <CardBody>
                <div className="text-sm-end">
                  {/*} <Button
                    type="button"
                    color="primary"
                    onClick={toggleAddManagerModal}
                    className="btn mb-2 me-2"
                  >
                    Add Manager
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    onClick={toggleAddDepartmentModal}
                    className="btn mb-2 me-2"
                  >
                    Add Department
                  </Button>*/}
                  <Button
                    type="button"
                    onClick={toggleAddEmployeeModal}
                    className="btn mb-2 me-2"
                  >
                    Add Employee
                  </Button>
                </div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => toggleTab("1")}
                    >
                      Manager
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => toggleTab("2")}
                    >
                      Employee
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <TableContainer
                      data={managerDetails}
                      columns={managerColumns}
                      isGlobalFilter={true}
                      isAddOptions={false}
                      customPageSize={10}
                      isPageSelect={false}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <TableContainer
                      data={employeeDetails}
                      columns={employeeColumns}
                      isGlobalFilter={true}
                      isAddOptions={false}
                      customPageSize={10}
                      isPageSelect={false}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
            {/* <AddManager
              isOpen={isAddManagerModalOpen}
              toggle={toggleAddManagerModal}
            />
            <AddDepartment
              isOpen={isAddDepartmentModalOpen}
              toggle={toggleAddDepartmentModal}
            />*/}
            <AddEmployee
              // <EmpRegNav
              isOpen={isAddEmployeeModalOpen}
              toggle={toggleAddEmployeeModal}
            />

            {/* newly added starts
            <ViewEmployeeDetails
              data={selectedEmployee}
              isOpen={isViewEmployeeModalOpen}
              toggle={toggleViewEmployeeModal}
              viewStatus={viewMode}
            /> */}
            {/*newly added end*/}
          </Container>
          {/*newly added starts*/}
        </>
      )}
    </React.Fragment>
    //newly added end
  );
};

export default ManageCompany;
