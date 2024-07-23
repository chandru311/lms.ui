import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
import TableContainer from "../../Common/components/TableContainer.jsx";
import { edit, view, deactivate } from "../../Common/common/icons.js";
import { getApiData, postApiData } from "../../Common/helpers/axiosHelper.js";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const DeptInfo = () => {
  const [DepartmentDetails, setDepartmentDetails] = useState([]);
  const [deptData, setDeptData] = useState([
    { sno: 1, department: "HR", manager: "John Doe", active: true },
    { sno: 2, department: "Finance", manager: "Jane Smith", active: false },
  ]);
  useEffect(() => {
    getDepartmentInfo();
  }, []);

  const [department, setDepartment] = useState("");
  const [manager, setManager] = useState("");
  const handleClick = async () => {
    const response = await Swal.fire({
      title: "Enter Details",
      html: `
      <div>
        <label for="swal-input1">Enter DepartmentName:</label>
        <input id="swal-input1" type="text" class="swal2-input" placeholder="Input 1">
        <label for="swal-input2">Enter Department Description:</label>
        <input id="swal-input2" type="text" class="swal2-input" placeholder="Input 2">
      
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: async () => {
        const departmentRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
        const managerRegex = /^[a-zA-Z\s]+$/;
        const DepartmentName = document.getElementById("swal-input1").value;
        const DepartmentDescription =
          document.getElementById("swal-input2").value;

        if (!DepartmentName || !DepartmentDescription) {
          Swal.showValidationMessage(
            "Please enter both department and manager."
          );
          return false; // Prevent form submission if validation fails
        } else if (
          !departmentRegex.test(DepartmentName) ||
          !departmentRegex.test(DepartmentDescription)
        ) {
          Swal.showValidationMessage(
            "Please enter only letters for department and manager."
          );
          return false; // Prevent form submission if non-text characters are entered
        }
        return true;
      },
    });
    if (response.value) {
      // User submitted the form (validation passed)
      const DepartmentName = document.getElementById("swal-input1").value;
      const DepartmentDescription =
        document.getElementById("swal-input2").value;

      try {
        const apiResponse = await postApiData(
          "api/Departments/CreateDepartment",
          JSON.stringify({ DepartmentName, DepartmentDescription })
        );
        if (response.success === true) {
          toast.success("Customer Created Successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          //   toggle();
          //  resetForm();
          // getCustomer();
        } else {
          toast.error(`${response.message}`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
        Swal.fire(
          "Error!",
          "An error occurred while communicating with the server.",
          "error"
        );
        // Handle network errors or other unexpected issues
      }
    }
  };
  const getDepartmentInfo = async () => {
    console.log("entered");
    const response = await getApiData(`api/Departments/GetAllDepartments`);

    console.log("department details " + response.data);
    const mappedResponse = response.data.map((item, index) => ({
      index: index + 1,
      sno: item.departmentId,
      DepartmentName: item.departmentName,
      DepartmentDescription: item.departmentDescription,
    }));
    setDepartmentDetails(mappedResponse || []);
    console.log("deptdetails" + DepartmentDetails);
  };

  const deptColumns = useMemo(
    () => [
      {
        Header: "SNO",
        accessor: "sno",
        filterable: false,
        disableFilters: true,
      },

      {
        Header: "Department",
        accessor: "DepartmentName",
        filterable: false,
        disableFilters: true,
      },
      {
        Header: "DepartmentDescription",
        accessor: "DepartmentDescription",
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
              onClick={handleClick}
              className="btn mb-2 me-2"
            >
              Add Department
            </Button>
          </div>

          <div>
            <TableContainer
              data={DepartmentDetails}
              columns={deptColumns}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
              isPageSelect={false}
            />
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default DeptInfo;
