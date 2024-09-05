import React, { useState, useMemo, useEffect } from "react";
import axios from "../../Common/helpers/axiosHelper.js";
import {
  Button,
  Badge,
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
import classnames from "classnames";
import { edit, view, deactivate } from "../../Common/common/icons.js";
import AddManager from "./AddManager";
import AddDepartment from "./AddDepartment.jsx";
import AddEmployee from "./AddEmployee";
import { ToastContainer, toast } from 'react-toastify';
import { getApiData, putApiData } from "../../Common/helpers/axiosHelper.js";
import ViewEmployeeDetails from "./ViewEmployeeDetails.jsx";
//import ViewManagerDetails from "./ViewManagerDetails.jsx";
import Loader from "../../Common/components/Loader.jsx";
import DeleteModal from '../../Common/components/DeleteModel.jsx'
import {
  faCheck,
  faEye,
  faPenToSquare,
  faTrash,
  faUserCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mapStatus } from '../../Common/common/StatusLabels';
import '../../Common/common/status.css';

const EmployeeAdministration = (props) => {
  const [activeTab, setActiveTab] = useState("1"); // To handle active tab
  //newly added  start
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [managerDetails, setManagerDetails] = useState([]);
  //newly added end
  const [isAddManagerModalOpen, setIsAddManagerModalOpen] = useState(false);
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  //newly added  start
  const [isViewEmployeeModalOpen, setIsViewEmployeeModalOpen] = useState(false);
  const [isViewManagerModalOpen, setIsViewManagerModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [employeeAddressData, setEmployeeAddressData] = useState([]);
  const [managerAddressData, setmanagerAddressData] = useState([]);
  const [UId, setUId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  //const [UId, setUId] = useState(null);
  const [deactivateTitle, setDeactivateTitle] = useState(false)

  //newly added end
  const authUser = JSON.parse(sessionStorage.getItem("authUser"))
  const userType = authUser.userType
  console.log("usertype" + userType)




  //newly added  start
  useEffect(() => {
    getEmployeeDetails();
    getManagerDetails();
  }, []);

  useEffect(() => {
    //    Fetch user role from props or state management solution
    setCurrentRole(props.userRole);
  }, [props.userRole]);
  const onClickDelete = () => {
    setDeleteModal(true);
    setDeactivateTitle(true);
  };
  const changeEmployeeStatus = async (uId, flag, action, target) => {

    try {
      // const { employeeId,managerId} = cellProps;
      if (target === "EMPLOYEE") {
               const response = await putApiData(`api/Employee/Active_Deactive/${uId}?isActive=${flag}`)
               if (response.success === true) {
          if (action === "deactivate") {
            console.log('Showing toast...');
            toast.success("Employee deactivated successfully!", {
              position: "top-right",
              autoClose: 1000,
            })
    //          setTimeout(() => {
    //  getEmployeeDetails();
    // }, 3000); 
          }
          else {
            console.log('Showing toast...');

            toast.success("Employee activated successfully!", {
              position: "top-right",
              autoClose: 1000,
            })
            // 
          }
          console.log('Toast should be shown now');

          console.log('Fetching employee details...');
          setTimeout(() => {
          getEmployeeDetails();
        }, 2000); 
          console.log('Employee details fetched');
        }
      }
      else {
        const response = await putApiData(`api/Manager/Active_Deactive/${uId}?isActive=${flag}`)
        if (response.success === true) {
          if (action === "deactivate") {
            toast.success("Employee deactivated successfully!", {
              position: "top-right",
              autoClose: 1000,
            })
            setTimeout(() => {
            getManagerDetails();
          }, 2000); 
          }
          else {
            {
              toast.success("Employee activated successfully!", {
                position: "top-right",
                autoClose: 1000,
              })
              setTimeout(() => {
                getManagerDetails();
              }, 2000); 
            }
          }
        }
      }

      //getEmployeeDetails();


    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(()=>{
  //   getEmployeeDetails()
  // },[])
  const getEmployeeDetails = async () => {
    try {
      setIsLoading(true);
      console.log("entered");
      let response
      if (userType === 1) {
        //getting employee details for admin
        const response = await getApiData(`api/Employee/GetAllEmployees`);
        setIsLoading(false);
        const mappedResponse = response.data.map((item, index) => ({
          index: index + 1,
          uId: item.uId,
          sno: index + 1,
          name: item.firstName,
          email: item.email,
          departmentId: item.departmentId,
          department: item.departmentName,
          employeeId: item.employeeId,
          addressId: item.addressId,
          active: item.active,
          //active:mapStatus(item.active),

          //console.log("employee details "+response.data);
        }));
        setEmployeeDetails(mappedResponse || []);
      }
      else {
        //getting employee details based on manager
        const response = await getApiData(`api/Employee/GetEmployeesByManager`);
        setIsLoading(false);
        const mappedResponse = response.data.map((item, index) => ({
          index: index + 1,
          uId: item.uId,
          sno: index + 1,
          name: item.firstName,
          email: item.email,
          departmentId: item.departmentId,
          department: item.departmentName,
          employeeId: item.employeeId,
          addressId: item.addressId,
          active: item.active,
          //   active:mapStatus(item.active),

          //console.log("employee details "+response.data);
        }));
        setEmployeeDetails(mappedResponse || []);
      }



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
      console.log("entered manager");
      const response = await getApiData(`api/Manager/GetAllManagers`);
      setIsLoading(false);
      const mappedResponse = response.data.map((item, index) => ({
        index: index + 1,
        sno: index + 1,
        name: item.firstName,
        managerId: item.managerId,
        addressId: item.addressId,
        email: item.email,
        departmentId: item.departmentId,
        department: item.departmentName,
        active: item.active,

        //console.log("employee details "+response.data);
      }));
      setManagerDetails(mappedResponse || []);
      setIsLoading(false);
      console.log("Managerdeatils" + managerDetails);
    } catch (error) {
      // Error handling scenario
      console.error("Error fetching employee data:", error);
      // Implement additional error handling as needed (e.g., display an error message to the user)
    }
  };
  const viewEmployeeData = (cellProps, target) => {
    const { employeeId, uId, addressId, managerId } = cellProps;
    //console.log(Uid);
    const getEmployeeData = async () => {
      // setIsLoading(true)
      let response
      if (target === "EMPLOYEE") {
        response = await getApiData(`api/Employee/GetEmployeeById/${employeeId}`);
        const mappedResponse = {
          // index: key ,
          employeeId: response.data.employeeId,
          managerId: response.data.managerId,
          addressId: response.data.addressId,
          active: response.data.active,
          userName: response.data.userName,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          departmentId: response.data?.departmentId || '',
          departmentName: response.data?.departmentName || '',
          maritalStatus: response.data?.maritalStatus || '',
          gender: response.data?.gender || '',
          email: response.data.email,
          mobileNumber: response.data.mobileNumber,
          dob: response.data.dob,
          dateOfJoining: response.data.dateOfJoining,
          password: response.data.password,
          confirmPassword: response.data.confirmPassword,
        };
        setEmployeeData(mappedResponse)
      }
      else {
        response = await getApiData(`api/Manager/GetManagerById/${managerId}`);
        const mappedResponse = {
          //   index:key,
          employeeId: response.data?.employeeId || '',
          managerId: response.data?.managerId || '',
          addressId: response.data?.addressId || '',
          active: response.data?.active || '',
          userName: response.data?.userName || '',
          firstName: response.data?.firstName || '',
          middleName: response.data?.middleName || '',
          lastName: response.data?.lastName || '',
          maritalStatus: response.data?.maritalStatus || '',
          gender: response.data?.gender || '',
          departmentId: response.data?.departmentId || '',
          departmentName: response.data?.departmentName || '',
          email: response.data?.email || '',
          mobileNumber: response.data?.mobileNumber || "",
          dob: response.data?.dob || "",
          dateOfJoining: response.data?.dateOfJoining || "",
          password: response.data?.password || "",
          confirmPassword: response.data?.confirmPassword || "",
        };
        setEmployeeData(mappedResponse)

      }



      // setIsLoading(false)


      console.log("mangerdetails" + employeeData)

    };
    const getEmployeeAddressData = async () => {
      // setIsLoading(true)

      const response = await getApiData(`api/Address/GetAddressById/${addressId}`);
      // setIsLoading(false)


      const mappedResponse = {
        //  index: index + 1,
        country: response.data.country || "",
        state: response.data.state || "",
        city: response.data.city || "",
        street: response.data.street || "",
        homeNo: response.data.homeNo || "",
        postalCode: response.data.postalCode || "",
        landMark: response.data.landMark || "",
      };


      setEmployeeAddressData(mappedResponse)


    };

    getEmployeeData();
    getEmployeeAddressData();
    toggleViewEmployeeModal();
  };
  const toggleViewEmployeeModal = () =>
    setIsViewEmployeeModalOpen(!isViewEmployeeModalOpen);
  const toggleViewManagerModal = () =>
    setIsViewManagerModalOpen(!isViewManagerModalOpen);

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
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        //   Cell: ({ value }) => {
        //     return (
        //         <Badge className={`font-size-11 badge-${value.color}`}>
        //             {value.label}
        //         </Badge>
        //     );
        // },
        Cell: cellProps => {
          return (
            <Badge
              className={
                "font-size-11 badge-" +
                (cellProps.row.original.active === 1 ? "success" : "danger")
              }
            >
              {cellProps.row.original.active === 1 ? "Active" : "Deactivated"}
            </Badge>


          );
        },
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
              style={{
                backgroundColor: "#5e2ced",
                color: "white",
                border: "none",
                marginRight: "5px" 
              }}
              aria-label="view"
              onClick={() => {
                setViewMode(true)
                viewEmployeeData(cellProps.row.original);
                console.log(cellProps.row.original)
                toggleViewEmployeeModal();

              }}
            >
              {view()}
            </Button>

            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded"
              title="Edit"
              style={{ marginRight: "5px" }}
              onClick={() => {
                setViewMode(false)
                viewEmployeeData(cellProps.row.original);
                toggleViewEmployeeModal();

              }}
            >
              {edit()}
            </Button>

            {(cellProps.row.original.active === 1) && (

              <Button
                type="button"
                color="danger"
                className="btn-sm btn-rounded"
                title="Deactivate"
                onClick={() => {

                  changeEmployeeStatus(cellProps.row.original.managerId, false, "deactivate");
                }}
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon icon={faX} />
              </Button>)}
            {cellProps.row.original.active === 0 && (
              <Button
                type="button"
                color="success"
                className="btn-sm btn-rounded"
                title="Activate"
                onClick={() => {

                  changeEmployeeStatus(cellProps.row.original.managerId, true, "activate");
                }}
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>)}
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
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        //   Cell: ({ value }) => {
        //     return (
        //         <Badge className={`font-size-11 badge-${value.color}`}>
        //             {value.label}
        //         </Badge>
        //     );
        // },
        Cell: cellProps => {
          return (
            <Badge
              className={
                "font-size-11 badge-" +
                (cellProps.row.original.active === 1 ? "success" : "danger")
              }
            >
              {cellProps.row.original.active === 1 ? "Active" : "Deactivated"}
            </Badge>

          );
        },


      },
      {
        Header: "Actions",
        disableFilters: true,
        accessor: "actions",
        Cell: (cellProps) => (
          <React.Fragment>
            <Button
              type="button"
              style={{
                backgroundColor: "#5e2ced",
                color: "white",
                border: "none",
                marginRight: "5px" 
              }}
              color="primary"
              className="btn-sm btn-rounded"
              title="View"
             // style={{ marginRight: "5px" }}
              onClick={() => {
                setViewMode(true)
                viewEmployeeData(cellProps.row.original, "EMPLOYEE");
                console.log(cellProps.row.original)
                toggleViewEmployeeModal();

              }}
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
              onClick={() => {
                setViewMode(false)
                viewEmployeeData(cellProps.row.original, "EMPLOYEE");
                toggleViewEmployeeModal();

              }}
            >
              {edit()}
            </Button>
            {(cellProps.row.original.active === 1) && (

              <Button
                type="button"
                color="danger"
                className="btn-sm btn-rounded"
                title="Deactivate"
                onClick={() => {

                  changeEmployeeStatus(cellProps.row.original.employeeId, false, "deactivate", "EMPLOYEE");
                }}
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon icon={faX} />
              </Button>)}
            {cellProps.row.original.active === 0 && (
              <Button
                type="button"
                color="success"
                className="btn-sm btn-rounded"
                title="Activate"
                onClick={() => {

                  changeEmployeeStatus(cellProps.row.original.employeeId, true, "activate", "EMPLOYEE");
                }}
                style={{ marginRight: "5px" }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>)}

          </React.Fragment>
        ),
      },
    ],
    []
  );

  return (
    //newly added start
    <React.Fragment>
      <ToastContainer containerId="Emp1Container" closeButton={false} limit={1} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          
          <ViewEmployeeDetails
            // data={selectedEmployee} 
            isOpen={isViewEmployeeModalOpen}
            toggle={toggleViewEmployeeModal}
            viewStatus={viewMode}
            employeeData={employeeData}
            employeeAddressData={employeeAddressData}
          />
          <AddEmployee
            isOpen={isAddEmployeeModalOpen}
            toggle={() => setIsAddEmployeeModalOpen(!isAddEmployeeModalOpen)}
          //toggle={toggleAddEmployeeModal}
          />
          <div className="page-content">
            <Container fluid>

              <div className="page-title-box p-4">
                <h4 className="mb-sm-0 font-size-18">Manage Company</h4>
              </div>
              <Card>
                <CardBody>
                  <div className="text-sm-end">
                    <Button
                      type="button"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      onClick={toggleAddEmployeeModal}
                      className="btn mb-2 me-2"
                    >
                      Add Employee
                    </Button>
                  </div>
                  <Nav tabs>
                    
                    {/* {userType === 1 && (
                      <NavItem
                     // className={classnames({ current: activeTab === 1 })}
                     >

                        <NavLink
                          className={activeTab === "1" ? "active" : ""}
                        
                      style={{
                        backgroundColor: activeTab === 1 ? "#5e2ced" : "",
                        // backgroundColor: activeTab === 1 ? "#007bff" : "",
                        color: activeTab === 1 ? "#fff" : "",
                      }}
                          onClick={() => toggleTab("1")}
                        >
                          Manager
                          </NavLink>
                      </NavItem>
                    )} */}
                    <NavItem
                  //  className={classnames({ current: activeTab === 2 })}
                    >
                      <NavLink
                       className={activeTab === "1" ? "active" : ""}
                       //className={classnames({ current: activeTab === 2 })}
                       //color={activeTab === 2 ? "primary" : "secondary"}
                      style={{
                        backgroundColor: activeTab === 2 ? "#5e2ced" : "",
                        color: activeTab === 1 ? "#fff" : "",
                      }}
                        onClick={() => toggleTab("1")}
                      >
                        Employee
                     </NavLink>
                    </NavItem>
                    {userType === 1 && (
                      <NavItem
                     // className={classnames({ current: activeTab === 1 })}
                     >

                        <NavLink
                          className={activeTab === "2" ? "active" : ""}
                        
                      style={{
                        backgroundColor: activeTab === 2 ? "#5e2ced" : "",
                        // backgroundColor: activeTab === 1 ? "#007bff" : "",
                        color: activeTab === 2 ? "#fff" : "",
                      }}
                          onClick={() => toggleTab("2")}
                        >
                          Manager
                          </NavLink>
                      </NavItem>
                    )}
                  </Nav>
                  <TabContent activeTab={activeTab}>
                   {/* {userType === 1 && ( */}
                      <TabPane tabId="1">
                        <TableContainer
                        data={employeeDetails}
                        columns={employeeColumns}
                          // data={managerDetails}
                          // columns={managerColumns}

                          isGlobalFilter={true}
                          isAddOptions={false}
                          customPageSize={10}
                          isPageSelect={false}
                        />
                      </TabPane>
                    {/* )} */}
                    {userType === 1 && (
                    <TabPane tabId="2">
                      <TableContainer
                       data={managerDetails}
                       columns={managerColumns}
                        // data={employeeDetails}
                        // columns={employeeColumns}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={10}
                        isPageSelect={false}
                      />
                    </TabPane>
                    )}
                  </TabContent>
                </CardBody>
              </Card>
            </Container>
          </div>
          {/*newly added starts*/}
        </>
      )}
    </React.Fragment>
    //newly added end
  );
};

export default EmployeeAdministration;
