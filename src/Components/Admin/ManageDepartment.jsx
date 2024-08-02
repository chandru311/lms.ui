import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  FormFeedback,
} from "reactstrap";
import Loader from "../../Common/components/Loader";
// import { debounce, values } from "lodash";
import { debounce } from "lodash";

import DeleteModal from "../../Common/components/DeleteModel";
import {
  deleteApiData,
  getApiData,
  putApiData,
  postApiData,
} from "../../Common/helpers/axiosHelper";
import TableContainer from "../../Common/components/TableContainer";
import { ToastContainer, toast } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import ReactSelect from "react-select";
// import SelectStyle from "../../../../common/data/SelectStyle";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  faCheck,
  faEye,
  faPenToSquare,
  faTrash,
  faUserCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// const DeptViewEdit = (props) => {
//   const {
//     isOpen,
//     toggle,
//     editMode,
//     departmentData,
//     departmentId,
//     getDepartmentDetails,
//   } = props;
const ManageDepartment = () => {
  // const badgeColor =
  //   cellProps.row.original.active === 1 ? "bg-green-200" : "bg-red-200";
  const [managerDropdown, setManagerDropdown] = useState([]);
  const [fetchedDepartmentId, setFetchedDepartmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal_editDept, setmodal_editDept] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [deptDetails, setDeptDetails] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [deleteAgentUid, setDeleteAgentUid] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [unameDisable, setUnameDisable] = useState(true);
  //   const { branchId } = useLatestTransactions();
  //   const { dept, fetchDept } = use();
  const [departmentId, setDepartmentId] = useState();

  // const onClickDelete = () => {
  //     setDeleteModal(true);
  //   };
  function tog_editDept() {
    setmodal_editDept(!modal_editDept);
  }
  //   useEffect(() => {
  //     fetchDept();
  //   }, []);
  //   console.log(dept);

  useEffect(() => {
    // if (departmentId !== null && departmentId !== undefined) {
    getDepartmentDetails();
  }, []);
  //   }, [departmentId]);

  //   const [error, setError] = useState(null);

  const deptValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      departmentName: deptDetails?.departmentName || "",
      departmentDescription: deptDetails?.departmentDescription || "",
      managerName: deptDetails?.managerName || "",
      // managerName: managerName.selectedmanagerName || "",
      departmentId: deptDetails?.departmentId || "",
      managerUId: deptDetails?.managerUId || "",
    },

    validationSchema: Yup.object({
      departmentName: Yup.string()
        .matches(/^[A-Za-z]+$/, "DepartmentName should contain only letters")
        .required("Please Enter DepartmentName"),
      departmentDescription: Yup.string()
        .matches(
          /^[A-Za-z\s-]+$/,
          "DepartmentDescription should contain only letters, spaces, and hyphens"
        )
        .required("Please Enter DepartmentDescription"),
      // .matches(
      //   /^[A-Za-z]+$/,
      //   "DepartmentDescription should contain only letters"
      // )
      // .required("Please Enter DepartmentDescription"),

      // departmentDescription: Yup.string()
      //   .matches(
      //     /^[A-Za-z]+$/,
      //     "DepartmentDescription should contain only letters"
      //   )
      // .required("Please Enter DepartmentDescription"),
      //   managerName: Yup.string()
      //     .matches(/^[A-Za-z]+$/, "ManagerName should contain only letters")
      //     .required("Please Enter ManagerName"),
    }),

    onSubmit: async (values, { resetForm }) => {
      // if (addMode === true){
      try {
        // if (departmentId) {
        if (deptDetails?.departmentId) {
          console.log("DEPARTMENT ID:" + departmentId);
          const hasChanges = Object.keys(values).some(
            (key) => values[key] !== deptValidation.initialValues[key]
          );
          if (hasChanges) {
            const combinedValues = {
              ...values,
              managerUId: values.managerName.value,
              managerName: values.managerName.selectedmanagerName,
            };
            const response = await putApiData(
              `api/Departments/UpdateDepartment/${deptDetails?.departmentId}`,

              JSON.stringify(combinedValues)
              // JSON.stringify(values)
            );
            if (response.success === true) {
              toast.success("Department Successfully Updated", {
                position: "top-right",
                autoClose: 3000,
              });

              getDepartmentDetails();
              tog_editDept();
            } else {
              toast.error("Error , Contact Admin", {
                position: "top-right",
                autoClose: 3000,
              });
            }
            tog_editDept();
            //   resetForm();
          } else {
            toast.error("No Changes to Update", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } else {
          const response = await postApiData(
            "api/Departments/CreateDepartment",
            JSON.stringify(values)
          );
          if (response) {
            if (response.success === true) {
              toast.success(" Department Added Successfully", {
                position: "top-right",
                autoClose: 3000,
              });
              resetForm();
              tog_editDept();
              getDepartmentDetails();
            } else if (response.success === false) {
              toast.error(`${response.message}`, {
                position: "top-right",
                autoClose: 3000,
              });
            } else {
              toast.error("Error , Contact Admin", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          }
        }
      } catch (errors) {
        console.error(errors);
      }
    },
  });

  // console.log("values" + values);
  //   console.log("updated data" + { response });

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
        departmentDescription: item.departmentDescription,
        active: item.active,
        //managerUId: item.managerUId;

        // DepartmentDescription: item.departmentDescription,
        managerName: item.managerName,
      }));
      setDeptData(mappedResponse || []);
      console.log("Mapped Response" + deptData);
      setIsLoading(false);

      // console.log("deptdetails" + DepartmentDetails);
      // console.log("Department details updated:", DepartmentDetails);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  //   useEffect(() => {
  //     console.log("validation values" + JSON.stringify(deptValidation.values));
  //     console.log("Validation errors" + JSON.stringify(deptValidation.errors));
  //   }, [deptValidation.values]);
  const deptColumns = useMemo(
    () => [
      {
        Header: "Department",
        accessor: "departmentName",
        filterable: false,
        disableFilters: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
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
                <div>
                  <Badge className="bg-red-400">not assigned</Badge>
                </div>
              )}
            </span>
          );
        },
      },
      {
        Header: "Active",
        accessor: "status",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          // const badgeColor =
          // cellProps.row.original.active === 1 ? "bg-green-200" : "bg-red-200";
          return (
            <Badge
              className={
                cellProps.row.original.active === 1
                  ? "bg-green-200  text-white font-bold px-3 py-2  rounded-full shadow-sm "
                  : "bg-red-200  text-white font-bold px-3 py-2  rounded-full shadow-sm "
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
        Cell: (cellProps) => {
          return (
            <>
              <Button
                type="button"
                color="primary"
                className="btn-sm btn-rounded"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => {
                  setViewMode(true);
                  tog_editDept();
                  setDeptDetails(cellProps.row.original || null);
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
              <Button
                type="button"
                color="success"
                className="btn-sm btn-rounded"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => {
                  setViewMode(false);
                  tog_editDept();
                  setDeptDetails(
                    cellProps.row.original // Spread operator to copy existing properties
                  );
                  //   setDeptDetails(cellProps.row.original);

                  //   setDeptDetails(cellProps.row.original || null);
                  console.log(cellProps.row.original);
                  console.log(deptDetails);
                  // No depaertmentiiiid in this stage so itv is calling create department
                  console.log(
                    "Department details in edit mode " + { deptDetails }
                  );
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              {/* <Button
                    type="button"
                    color="danger"
                    className="btn-sm btn-rounded"
                    style={{ marginRight: "5px" , marginBottom : "5px" }}
                    onClick={()=>{
                      setDeleteAgentUid(cellProps.row.original.agentUid)
                      onClickDelete()
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} /> 
              </Button> */}
              {cellProps.row.original.active === 1 && (
                <Button
                  type="button"
                  color="danger"
                  className="btn-sm btn-rounded"
                  title="Deactivate"
                  onClick={() => {
                    changeDeptStatus(cellProps.row.original.departmentId, 0);
                    console.log(cellProps.row.original.departmentId);
                  }}
                  style={{ marginRight: "5px", marginBottom: "5px" }}
                >
                  <FontAwesomeIcon icon={faX} />
                </Button>
              )}

              {cellProps.row.original.active === 0 && (
                <Button
                  type="button"
                  color="success"
                  className="btn-sm btn-rounded"
                  title="Activate"
                  onClick={() => {
                    changeDeptStatus(cellProps.row.original.departmentId, 1);
                  }}
                  style={{ marginRight: "5px", marginBottom: "5px" }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              )}
            </>
          );
        },
      },
    ],
    []
  );

  // const softDeleteStaffData = async () => {
  //     try {
  //       const response = await deleteApiData(
  //         `api/AgentProfile/DelteAgent?AgentId=${deleteAgentUid}`
  //       );
  //       if (response.success === true) {
  //         toast.success("Staff Deleted Successfully", {
  //           position: "top-right",
  //           autoClose: 2000,
  //         });
  //         setDeleteModal(false);
  //         getStaff();
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const changeDeptStatus = async (departmentId, action) => {
    console.log(action);
    try {
      // console.log("Agent ID to approve " + approveAgentUid);
      // const response = await putApiData(
      //   `api/AgentProfile/ApproveOrReject?AgentID=${agentUid}&Approved=${flag}`
      // );
      const response = await axios.patch(
        `api/Departments/Active_Deactive/${departmentId}`,
        action
        // JSON.stringify(values)
      );
      console.log(response);
      if (response.success === true) {
        // if (action === "approve") {
        //   toast.success("Agent verified and approved!", {

        //     position: "top-right",
        //     autoClose: 2000,
        //   });
        //   getStaff();
        // } else
        if (action === 0) {
          toast.success("Department deactivated successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          getDepartmentDetails();
        } else {
          {
            toast.success("Department activated successfully!", {
              position: "top-right",
              autoClose: 2000,
            });
            getDepartmentDetails();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getManager = async (typedtext) => {
    // try {
    //   setIsLoading(true);
    const data = {
      pageNumber: 1,
      pageCount: 50,
      filterColumns: [
        {
          columnName: "firstName",
          // filterValue: `${managerUId}`,
          filterValue: `${typedtext}`,
          filterType: 6,
        },
        {
          columnName: "lastName",
          // filterValue: `${managerUId}`,
          filterValue: `${typedtext}`,
          filterType: 6,
        },
        {
          columnName: "username",
          // filterValue: `${managerUId}`,
          filterValue: `${typedtext}`,
          filterType: 6,
        },
      ],
    };
    const response = await postApiData(
      "api/Manager/GetNonAllottedManagerByPagination",
      data
    );
    // setIsLoading(false);

    const mappedResponse = response.model.map((item, index) => ({
      index: index + 1,
      label: `${item.firstName} ${item.middleName && item.middleName} ${
        item.lastName
      } [${item.userName}]`,
      value: item.managerUId,
      selectedmanagerName: `${item.firstName} ${
        item.middleName && item.middleName
      } ${item.lastName}`,
      // userStatus: item.userStatus,
    }));
    setManagerDropdown(mappedResponse);
    console.log("mapped:" + mappedResponse);
    //   setIsLoading(false);
    // } catch (error) {
    //   // Error handling scenario
    //   console.error("Error fetching manager data:", error);
    //   // Implement additional error handling as needed (e.g., display an error message to the user)
    // }
  };

  // if (mappedResponse.length <= 0){
  //     if(fromCustomerId !== undefined){
  //         toast.error(`Customer Not Found`,{
  //             position: 'top-right',
  //             autoClose: 2000,
  //             closeButton: false
  //         })
  //     }
  //     else{
  //         setState((prevState) => ({...prevState, customerList: mappedResponse }))
  //     }
  // }else if(mappedResponse.length > 0){
  //     setState((prevState) => ({...prevState, customerList: mappedResponse }))
  // }

  // function handleManagerName(typedtext) {
  //   console.log(typedtext);
  const delayGetManager = debounce(getManager, 1500);
  // delayGetManager

  // getManager(typedtext);
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
          <Modal
            isOpen={modal_editDept}
            toggle={() => {
              tog_editDept();
            }}
            name="Edit Dept"
            size="lg"
            onClosed={() => {
              deptValidation.resetForm();
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                DEPARTMENT DETAILS
              </h5>
              <button
                type="button"
                onClick={() => {
                  setmodal_editDept(!modal_editDept);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form
                className="needs-validation"
                onSubmit={(e) => {
                  e.preventDefault();
                  deptValidation.handleSubmit(e);
                  return false;
                }}
              >
                <Row>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="departmentName">Department Name</Label>
                      <RequiredAsterisk />
                      <Input
                        name="departmentName"
                        placeholder="Enter the Department Name"
                        type="text"
                        id="departmentName"
                        disabled={viewMode}
                        value={deptValidation.values.departmentName}
                        onChange={deptValidation.handleChange}
                        onBlur={deptValidation.handleBlur}
                        invalid={
                          deptValidation.touched.departmentName &&
                          deptValidation.errors.departmentName
                            ? true
                            : false
                        }
                      />
                      {deptValidation.touched.departmentName &&
                      deptValidation.errors.departmentName ? (
                        <FormFeedback type="invalid">
                          {deptValidation.errors.departmentName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="departmentDescription">
                        Department Description
                      </Label>
                      <RequiredAsterisk />
                      <Input
                        name="departmentDescription"
                        placeholder="Enter the Department Description"
                        type="text"
                        id="departmentDescription"
                        disabled={viewMode}
                        value={deptValidation.values.departmentDescription}
                        onChange={deptValidation.handleChange}
                        onBlur={deptValidation.handleBlur}
                        invalid={
                          deptValidation.touched.departmentDescription &&
                          deptValidation.errors.departmentDescription
                            ? true
                            : false
                        }
                      />
                      {deptValidation.touched.departmentName &&
                      deptValidation.errors.departmentDescription ? (
                        <FormFeedback type="invalid">
                          {deptValidation.errors.departmentDescription}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="managerName">Manager Name</Label>
                      <ReactSelect
                        name="managerName"
                        placeholder="Enter ManagerName"
                        id="managerName"
                        // value={deptValidation.values.managerName}
                        // onChange={deptValidation.handleChange}
                        // onChange={handleManagerName}
                        // onChange={handleManagerName}
                        disabled={viewMode}
                        options={managerDropdown}
                        value={deptValidation.values.managerName}
                        // onChange={handleDepartmentChange}
                        onChange={(selectedOption) => {
                          deptValidation.setFieldValue(
                            "managerName",
                            selectedOption
                          );
                        }}
                        onInputChange={(inputValue, { action }) => {
                          if (
                            action === "input-change" &&
                            inputValue.length >= 3
                          ) {
                            delayGetManager(inputValue);
                          }
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              {/* </ModalBody> */}
              {/* <ModalFooter>
          {editMode ? null : ( */}
              <div className="modal-footer">
                <Button
                  type="button"
                  className="btn btn-primary "
                  onClick={() => tog_editDept()}
                  hidden={!viewMode}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  // type="button"
                  className="btn btn-primary "
                  onClick={deptValidation.handleSubmit}
                  hidden={viewMode}
                  disabled={deptValidation.isSubmitting}
                >
                  Save Changes
                  {/* </Button>
                <Button> */}
                </Button>
              </div>
            </div>
          </Modal>
          {/* <DeleteModal
            show={deleteModal}
            onDeleteClick={softDeleteStaffData}
            onCloseClick={() => setDeleteModal(!deleteModal)}
          /> */}
          <Card>
            <CardBody>
              <div className="mb-4 h4 card-title">Department Details</div>

              <div className="text-sm-end mb-2">
                <Button
                  type="button"
                  onClick={() => {
                    setViewMode(false);
                    setDeptDetails(null);
                    tog_editDept();
                  }}
                  style={{ backgroundColor: "#5e2ced" }}
                  // className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Add New Department
                </Button>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <TableContainer
                    columns={deptColumns}
                    data={deptData}
                    isGlobalFilter={true}
                    customPageSize={10}
                  />
                  {deptData.length < 1 ? (
                    <div>
                      <p>No Records to Show</p>
                    </div>
                  ) : null}
                </>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManageDepartment;
