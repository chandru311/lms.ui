import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, CardBody, Container, Badge } from "reactstrap";
import TableContainer from "../../Common/components/TableContainer.jsx";
import { edit, view, deactivate } from "../../Common/common/icons.js";
import { getApiData, postApiData } from "../../Common/helpers/axiosHelper.js";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import AddDepartment from "./AddDepartment.jsx";
// import ViewEditDepartment from "./ViewEditDepartment.jsx";
import Loader from "../../Common/components/Loader.jsx";
import DeptViewEdit from "./DeptViewEdit.jsx";

const DeptInfo = (props) => {
  const [isAddDeptModalOpen, setIsAddDeptModalOpen] = useState(false);
  const toggleAddDeptModal = () => setIsAddDeptModalOpen(!isAddDeptModalOpen);
  const [isLoading, setIsLoading] = useState(false);

  const [DepartmentDetails, setDepartmentDetails] = useState([]);
  const [deptData, setDeptData] = useState([
    { sno: 1, department: "HR", manager: "John Doe", active: true },
    { sno: 2, department: "Finance", manager: "Jane Smith", active: false },
  ]);
  const [addMode, setAddmode] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const toggleViewModal = () => {
    setViewModal(!viewModal);
    console.log("viewmodal toggled" + viewModal);
  };
  const [departmentId, setDepartmentId] = useState([]);
  useEffect(() => {
    getDepartmentDetails();
  }, []);
  const getDepartmentDetails = async () => {
    try {
      setIsLoading(true);

      // console.log("entered");
      const response = await getApiData(`api/Departments/GetAllDepartments`);
      setIsLoading(false);

      // console.log("department details " + response.data);
      // console.log("department details:", response.data);
      // const mappedResponse = response.data.map((item, index) => ({
      const mappedResponse = response.data?.map((item, index) => ({
        index: index + 1,
        departmentId: item.departmentId,
        // Department: item.departmentName,
        departmentName: item.departmentName,

        // DepartmentDescription: item.departmentDescription,
        managerName: item.managerName,
      }));
      setDepartmentDetails(mappedResponse || []);
      setIsLoading(false);

      // console.log("deptdetails" + DepartmentDetails);
      // console.log("Department details updated:", DepartmentDetails);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  const viewDeptDetails = (cellProps) => {
    console.log("entered viewdeptdetails");
    const { departmentId } = cellProps;
    console.log("departmentId" + departmentId);
    const getDeptDetailsbyId = async () => {
      const response = await getApiData(
        `api/Departments/GetDepartment/${departmentId}`
        // `api/Departments/GetDepartment/?departmentId=${departmentId}`
        // `api/Departments/GetDepartment/{departmentId}=${departmentId}`
        // `api/Departments/GetDepartment/+${departmentId}`
      );
      console.log("API getby deptid completed");
      console.log(response);
      const mappedResponse = {
        departmentId: response.data.departmentId,
        departmentName: response.data.departmentName,
        departmentDescription: response.data.departmentDescription,
        managerName: response.data.managerName,
      };
      setDepartmentData(mappedResponse);
      // console.log("getdept by ID mapped");
      // console.log("DepartmentData" + departmentData);
    };

    getDeptDetailsbyId();
    console.log("exit getdeptdetails by ID");
    toggleViewModal();
    console.log("TOGGLE VIEW MODAL");
    console.log({ toggleViewModal });
    console.log(
      "Exiting viewdeptdetails and entering remaining ONClick of Edit/View"
    );
  };

  const [department, setDepartment] = useState("");
  const [manager, setManager] = useState("");
  //   if (response.value) {
  //     // User submitted the form (validation passed)
  //     // const DepartmentName = document.getElementById("swal-input1").value;
  //     // const DepartmentDescription =
  //     //   document.getElementById("swal-input2").value;
  //     const { DepartmentName, DepartmentDescription } = response.value;
  //     console.log(DepartmentName, DepartmentDescription);
  //     try {
  //       const apiResponse = await postApiData(
  //         "api/Departments/CreateDepartment",
  //         JSON.stringify({ DepartmentName, DepartmentDescription })
  //       );
  //       if (response.success === true) {
  //         toast.success("Customer Created Successfully", {
  //           position: "top-right",
  //           autoClose: 3000,
  //         });
  //         //   toggle();
  //         //  resetForm();
  //         // getCustomer();
  //       } else {
  //         toast.error(`${response.message}`, {
  //           position: "top-right",
  //           autoClose: 3000,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error sending data to backend:", error);
  //       Swal.fire(
  //         "Error!",
  //         "An error occurred while communicating with the server.",
  //         "error"
  //         // 'An error occurred while creating the department: ${error.message || "Unknown error"}`,
  //         // "error"
  //       );
  //       // Handle network errors or other unexpected issues
  //     }
  //   }
  // };

  const deptColumns = useMemo(
    () => [
      // {
      //   Header: "SNO",
      //   accessor: "sno",
      //   filterable: false,
      //   disableFilters: true,
      // },

      {
        Header: "Department",
        accessor: "departmentName",
        filterable: false,
        disableFilters: true,
      },
      // {
      //   Header: "Manager",
      //   accessor: "DepartmentDescription",
      //   filterable: false,
      //   disableFilters: true,
      // },
      {
        Header: "Manager",
        accessor: "managerName",
        filterable: false,
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <span>
              {cellProps.value ? (
                cellProps.value
              ) : (
                <Badge color="danger">not assigned</Badge>
              )}
            </span>
          );
        },
      },
      // {
      //   Header: "Active",
      //   accessor: "status",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return (
      //       <Badge
      //         className={
      //           "font-size-11 badge-soft-" +
      //           (cellProps.row.original.active === 1 ? "success" : "danger")
      //         }
      //       >
      //         {cellProps.row.original.active === 1 ? "Active" : "Deactivated"}
      //       </Badge>
      //     );
      //   },
      // },
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
              onClick={() => {
                setAddmode(false);
                setEditMode(false);
                viewDeptDetails(cellProps.row.original);
                // getDeptDetailsbyId(cellProps.row.original);
                toggleViewModal();
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
                setAddmode(false);
                setEditMode(true);
                viewDeptDetails(cellProps.row.original);
                setDepartmentId(cellProps.row.original.departmentId);
                // toggleViewModal();
              }}
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
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container fluid>
            <div className="page-title-box p-4">
              <h4 className="mb-sm-0 font-size-18">Department Info</h4>
            </div>
            <Card>
              <CardBody>
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="primary"
                    // onClick={toggleAddDeptModal}
                    // onClick={handleClick}
                    onClick={() => {
                      setAddmode(true);
                      setEditMode(false);
                      // viewDeptDetails(cellProps.row.original);
                      // setDepartmentId(cellProps.row.original.departmentId);
                    }}
                    className="btn mb-2 me-2"
                  >
                    Add Department
                  </Button>
                </div>

                <div>
                  <TableContainer
                    data={DepartmentDetails}
                    // data={deptData}
                    columns={deptColumns}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    isPageSelect={false}
                  />
                </div>
              </CardBody>
            </Card>
            {/* <AddDepartment
              isOpen={isAddDeptModalOpen}
              toggle={toggleAddDeptModal}
            /> */}
            <DeptViewEdit
              isOpen={viewModal}
              toggle={toggleViewModal}
              editmode={editmode}
              addMode={addMode}
              departmentData={departmentData}
              departmentId={departmentId}
              getDepartmentDetails={getDepartmentDetails}
            />
          </Container>
        </>
      )}
    </React.Fragment>
  );
};
console.log("Ready to send props");
export default DeptInfo;
