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
// import { mapStatus } from '../../Common/common/StatusLabels';
// import '../../Common/common/status.css';
import { mapStatusDept } from "../../Common/common/ActivedeactLabels";
import "../../Common/common/DeptActDecLabels.css";

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
  const [managerPagiDropdown, setManagerPagiDropdown] = useState([]);
  const [managerAllDropdown, setManagerAllDropdown] = useState([]);
  const [fetchedDepartmentId, setFetchedDepartmentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal_editDept, setmodal_editDept] = useState(false);
  const [deptData, setDeptData] = useState([]);
  const [deptDetails, setDeptDetails] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  // const [deleteAgentUid, setDeleteAgentUid] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [unameDisable, setUnameDisable] = useState(true);
  //   const { branchId } = useLatestTransactions();
  //   const { dept, fetchDept } = use();
  const [departmentId, setDepartmentId] = useState();
  const [managerOptions, setManagerOptions] = useState();

  // const onClickDelete = () => {
  //     setDeleteModal(true);
  //   };
  function tog_editDept() {
    setmodal_editDept(!modal_editDept);
  }
  // change on5/08 starts
  // const getManagerDetails = async () => {
  //   try {
  //     setIsLoading(true);
  //     console.log("entered");
  //     const response = await getApiData(`api/Manager/GetAllManagers`);
  //     // const deptoptions = response.data.departmentName || [];
  //     setIsLoading(false);
  //     console.log("****************");

  //     // console.log("Department" + deptoptions);

  //     const mappedResponse = response.model.map((item, index) => ({
  //       index: index + 1,
  //       label: `${item.firstName} ${item.middleName && item.middleName} ${
  //         item.lastName
  //       } [${item.userName}]`,
  //       value: item.managerUId,
  //       allManagerDeptName: item.departmentName,
  //       allManagerDeptId: item.departmentId,
  //       selectedallmanagerName: `${item.firstName} ${
  //         item.middleName && item.middleName
  //       } ${item.lastName}`,
  //       // userStatus: item.userStatus,
  //     }));
  //     setManagerAllDropdown(mappedResponse);
  //     console.log("mapped:" + mappedResponse);
  //     // console.log("DepartDetails" + departDetails);
  //     // setIsLoading(false);
  //   } catch (error) {
  //     // Error handling scenario
  //     console.error("Error fetching All Managers  data:", error);
  //     // Implement additional error handling as needed (e.g., display an error message to the user)
  //   }
  // };
  //change on 5/08 ends

  //   useEffect(() => {
  //     fetchDept();
  //   }, []);
  //   console.log(dept);

  useEffect(() => {
    // if (departmentId !== null && departmentId !== undefined) {
    getDepartmentDetails();
    //change on 5/08 starts
    // getManagerDetails();
    // change on5/08 ends
  }, []);
  //   }, [departmentId]);

  //   const [error, setError] = useState(null);

  const deptValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      departmentName: deptDetails?.departmentName || "",
      departmentDescription: deptDetails?.departmentDescription || "",
      // const foundDay = daysOption.find(option => option.value === state.days); // { value: 'Tuesday', label: 'Tuesday' }
      // roleId:
      // roleList.find((option) => option.value === staffDetails?.roleId) ||
      // null,
      departmentId: deptDetails?.departmentId || "",
      managerUId: deptDetails?.managerUId || "",
      // managerName: deptDetails?.managerName || "",
      managerName:
        deptData.find(
          (option) => option.managerName === deptDetails?.managerName
        ) || null,

      //change on 5/08 starts
      // if(deptDetails.departmentId===managerAllDropdown.departmentId)
      //   {
      // managerName=  managerAllDropdown.selectedallmanagerName

      //   }
      // else {
      //  managerName:
      //     managerAllDropdown.find(
      //       (option) => option.managerName === deptDetails?.managerName
      //     ) || null,

      // managerName:
      //   managerAllDropdown.find(
      //     (option) => option.selectedallmanagerName === deptDetails?.managerName
      //   ) || null,
      //   }
      //Change on 5/08 ends
      // managerName:
      //   managerPagiDropdown.find(
      //     (option) => option.value === deptDetails?.managerUId
      //   ) || null,
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
            // const roleValue = values.roleId && values.roleId.value;
            const combinedValues = {
              ...values,
              // managerUId: deptData.managerUId,
              // managerName: deptData.managerName,

              managerUId: values.managerName.value,

              managerName: values.managerName.label,
              // managerName: values.managerName.selectedmanagerName,
            };
            // console.log(combinedValues);
            console.log(JSON.stringify(combinedValues, null, 2));

            const response = await putApiData(
              `api/Departments/UpdateDepartment/${deptDetails?.departmentId}`,

              JSON.stringify(combinedValues)
              // JSON.stringify(values)
            );
            console.log("COMVALUES:" + combinedValues);
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
      // setIsLoading(false);
      //   const managerOptions = response.data.map(dept => ({
      //     value: dept.managerId, // Assuming managerId exists
      //     label: dept.managerName
      //   });

      //   setManagerOptions(managerOptions);
      //  //
      //   setIsLoading(false)

      // console.log("department details " + response.data);
      // console.log("department details:", response.data);
      // const mappedResponse = response.data.map((item, index) => ({
      const mappedResponse = response.data?.map((item, index) => ({
        index: index + 1,
        departmentId: item.departmentId,
        // Department: item.departmentName,
        departmentName: item.departmentName,
        departmentDescription: item.departmentDescription,
        // active: mapStatusDept(item.active),
        active: item.active,
        // status: mapStatus(item.status),
        managerUId: item.managerUId,

        // DepartmentDescription: item.departmentDescription,
        managerName: item.managerName,
        label: item.managerName,
        value: item.managerUId,
      }));

      console.log("department details&&&:", mappedResponse);
      //changed on 07/08 during update API check  setDeptData(mappedResponse || []); to  setDeptData(mappedResponse);
      // setDeptData(mappedResponse);
      setDeptData(mappedResponse || []);
      console.log("&&&");
      console.log(JSON.stringify(deptData, null, 2));
      console.log("Mapped Response&&&&" + { deptData });
      setIsLoading(false);

      // console.log("deptdetails" + DepartmentDetails);
      // console.log("Department details updated:", DepartmentDetails);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const ManagerRemoval = async () => {
    const response = await getApiData(
      `api/Departments/RemoveManager/${deptDetails?.departmentId}`
    );
    if (response.success === true) {
      toast.success(" Manager removed from Department Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Error , Contact Admin", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  // const response = await getApiData(`api/Departments/GetAllDepartments`);
  // console.log(JSON.stringify(deptDetails, null, 2));
  // console.log("cell" + deptDetails);
  // managerName:
  // if (
  //   deptData.find((option) => option.managerName === deptDetails?.managerName)
  // )
  //   deptData.managerName = null;
  // deptData.managerUId = 0;

  // deptDetails.managerUId = 0;
  // deptDetails.managerName = null;
  // };

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
          // <Badge
          //   className={`font-size-11 ${
          //     value === 0 ? "Badge-danger" : "Badge-success"
          //   }`}
          // >
          //   {value === 0 ? "Deactive" : "Active"}
          // </Badge>;
          return (
            <span>
              {cellProps.value ? (
                cellProps.value
              ) : (
                <Badge className="font-size-11 Badge-warning">
                  not assigned
                </Badge>
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
      //   Cell: ({ cellProps }) => {
      //     // console.log({ value });
      //     return (
      //       <Badge
      //         className={`font-size-11 ${
      //           cellProps.value === 0 ? "Badge-danger" : "Badge-success"
      //         }`}
      //       >
      //         {cellProps.value === 0 ? "Deactive" : "Active"}
      //       </Badge>

      //       // <Badge className={`font-size-11 Badge-${value.color}`}>
      //       //   {value.label}
      //       // </Badge>
      //     );
      //   },
      // },
      // {
      //   Header: "Active",
      //   accessor: "status",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: ({ value }) => (
      //     <Badge
      //       className={
      //         'font-size-11 ${value ? "Badge-success" : "Badge-danger"'
      //       }
      //     >
      //       {value ? "Active" : "Deactive"}
      //     </Badge>
      //   ),
      // },
      {
        Header: "Active",
        accessor: "active",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => {
          console.log("Active value:", value); // Add this line to debug
          return (
            <Badge
              className={`font-size-11 ${
                value === 0 ? "badge-danger" : "badge-success"
              }`}
            >
              {value === 0 ? "Deactivate" : "Active"}
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
                  // if (cellProps.row.original.selectedmanagerName !== null) {
                  //   getManager(
                  //     cellProps.row.original.selectedmanagerName?.slice(0, 3)
                  //   );
                  // }
                  // setDeptDetails(cellProps.row.original || null);
                  setDeptDetails(cellProps.row.original);
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
                  // if (cellProps.row.original.selectedmanagerName !== null) {
                  //   getManager(
                  //     cellProps.row.original.selectedmanagerName?.slice(0, 3)
                  //   );
                  // }
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
    setManagerPagiDropdown(mappedResponse);
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
  useEffect(() => {
    // if (departmentId !== null && departmentId !== undefined) {
    getDepartmentDetails();
    //change on 5/08 starts
    // getManagerDetails();
    // change on5/08 ends
  }, []);
  //   }, [departmentId]);

  return (
    <React.Fragment>
      <div
      //  className="page-content"
      >
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
          <Modal
            className="exampleModal"
            autoFocus={true}
            centered={true}
            tabIndex="-1"
            isOpen={modal_editDept}
            toggle={() => {
              tog_editDept();
            }}
            name="Edit Dept"
            size="lg"
            onClosed={() => {
              deptValidation.resetForm();
              // setManagerPagiDropdown([]);
            }}
          >
            {/* <div id="myModal" class="modal"> */}
            {/* <div className="modal-content"> */}
            <ModalHeader>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
              {/* // <div className="modal-header">
            //   <h5 className="modal-title mt-0" id="myModalLabel"> */}
              DEPARTMENT DETAILS
              {/* <Button
                type="button"
                className="close"
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => tog_editDept()}
              >
                <span aria-hidden="true">&times;</span>
              </Button> */}
              {/* <span class="close">&times;</span> */}
              <span
                className="icon close_icon"
                style={{ position: "absolute", top: 10, right: 10 }}
                onClick={() => tog_editDept()}
              >
                X
              </span>
            </ModalHeader>
            {/* // </h5> */}
            {/* <button
                type="button"
                onClick={() => {
                  setmodal_editDept(!modal_editDept);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
               </ModalHeader>
                <span aria-hidden="true">&times;</span>
              </button> */}
            {/* //{" "} */}
            {/* </div> */}
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

                  {/* <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="managerName">ManagerName</Label>
                      <RequiredAsterisk />
                      <Input
                        name="managerName"
                        placeholder="Enter the managerName"
                        type="text"
                        id="managerName"
                        disabled={viewMode}
                        value={deptValidation.values.managerName}
                        onChange={deptValidation.handleChange}
                        onBlur={deptValidation.handleBlur}
                        invalid={
                          deptValidation.touched.managerName &&
                          deptValidation.errors.managerName
                            ? true
                            : false
                        }
                      />
                      {deptValidation.touched.managerName &&
                      deptValidation.errors.managerName ? (
                        <FormFeedback type="invalid">
                          {deptValidation.errors.managerName}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>
                  </Col> */}

                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="managerName">Manager Name</Label>
                      {/* start change on 5/08}*/}
                      {/* if(setDeptData.departmentId ===
                      setManagerAllDropdown.departmentId)
                      {
                        // <Label htmlFor="managerName">Manager Name</Label>
                        <Input
                          name="managerName"
                          placeholder="Enter ManagerName"
                          id="managerName"
                          disabled={viewMode}
                          value={deptValidation.values.setDeptData.managerName}
                        />
                      }
                      else */}

                      {/* change on 5/08 ends*/}
                      <ReactSelect
                        name="managerName"
                        placeholder="Enter ManagerName"
                        id="managerName"
                        // value={deptValidation.values.managerName}
                        // onChange={deptValidation.handleChange}
                        // onChange={handleManagerName}
                        // onChange={handleManagerName}
                        isDisabled={viewMode}
                        // options={managerPagiDropdown}
                        // options={managerAllDropdown}
                        options={deptData}
                        value={deptValidation.values.managerName}
                        // onChange={handleDepartmentChange}

                        onChange={(selectedOption) => {
                          deptValidation.setFieldValue(
                            "managerName",
                            selectedOption
                          );
                        }}
                        // onInputChange={(inputValue, { action }) => {
                        //   if (
                        //     action === "input-change" &&
                        //     inputValue.length >= 3
                        //   ) {
                        //     delayGetManager(inputValue);
                        //   }
                        // }}
                      />
                      <a
                        style={{ color: "red" }}
                        onClick={
                          () => {
                            ManagerRemoval();
                          }
                          // Your set of actions here
                          // console.log("Link clicked!"); // Example action
                          // You can perform API calls, update state, etc.
                        }
                      >
                        Remove Manager
                      </a>
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
                {/* <Button
                  type="submit"
                  className="btn btn-primary "
                  // onClick={notDeptmanager}
                  hidden={viewMode}
                  disabled={deptValidation.isSubmitting}
                >
                  Remove Manager
                </Button> */}
                <Button
                  type="submit"
                  // type="button"
                  className="btn btn-primary "
                  onClick={deptValidation.handleSubmit}
                  hidden={viewMode}
                  disabled={deptValidation.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </div>
            {/* </div> */}
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
                    //newly added to make dropdown null while creating department deptData is the statevariable with mappedresponse of all managernamefrom getAllDepartment //setDeptData([])
                    setDeptData([]);
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
