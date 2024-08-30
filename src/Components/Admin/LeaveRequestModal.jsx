import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import { postApiData } from "../../Common/helpers/axiosHelper";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import { getApiData, putApiData } from "../../Common/helpers/axiosHelper.js";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Container,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  FormFeedback,
} from "reactstrap";
import { download, trash } from "../../Common/common/icons.js";
import { useLeaveTypes } from "../../Common/common/commonFunctions.js";
import Select from "react-select";
const LeaveRequestModal = (props) => {
  const { isOpen, toggle, viewMode, leaveRequest, proofDoc, docDetails } =
    props;

  // const [leaveRequest, setLeaveRequest] = useState([]);
  const [docIsValid, setDocIsValid] = useState(false);
  const [docFormat, setDocFormat] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { leaveTypes, getLeaveTypes } = useLeaveTypes();

  const leaveValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      leaveId: leaveRequest?.leaveId || null,
      uId: leaveRequest?.uId || null,
      uName: leaveRequest?.uName || null,
      leaveTypeId:
        leaveTypes.find(
          (option) => option.value === leaveRequest?.leaveTypeId
        ) || null,
      fromDate: leaveRequest?.fromDate || "",
      toDate: leaveRequest?.toDate || "",
      reason: leaveRequest?.reason || "",
      comments: leaveRequest?.comments || "",
      proof: leaveRequest?.proof || "",
      reViewedBy: leaveRequest?.reViewedBy || "",
    },
    validationSchema: Yup.object({
      // comments: Yup.string().required("Please enter a valid comment"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("button clicked");
      if (values.leaveId > 0) {
        if (
          JSON.stringify(values) ===
          JSON.stringify(leaveValidation.initialValues)
        ) {
          toast.info("No changes to save", {
            position: "top-right",
            autoClose: 1000,
          });
          resetForm();
          toggle();
          // window.location.reload();
          return;
        }
        try {
          setIsLoading(true);
          const leaveTypeValue = values.leaveTypeId && values.leaveTypeId.value;
          // const uIdValue = values.uId && values.uId.value;
          const combinedValues = {
            ...values,
            leaveId: leaveRequest.leaveId,
            leaveTypeId: leaveTypeValue,
            proof: fileData,
          };
          const response = await putApiData(
            `api/Leave/UpdateLeave/${leaveRequest.leaveId}`,
            JSON.stringify(combinedValues)
          );
          if (response.success === true) {
            toast.success("Leave Request Updated", {
              position: "top-right",
              autoClose: 1000,
            });
            setIsLoading(false);
            resetForm();
            toggle();
            const timer = setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (error) {
          console.error("Error updating leave request", error);
          toast.error("Failed to update leave request", {
            position: "top-right",
            autoClose: 2000,
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
  });
  useEffect(() => {
    getLeaveTypes();
    console.log("modal", leaveRequest);
  }, [leaveRequest]);

  function handleFileChange(e) {
    setDocIsValid(true);
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000 * 1024) {
      toast.error("File Size Should be less than 5MB", {
        position: "top-right",
        autoClose: 3000,
      });
      // leaveValidation.resetForm();
      setDocIsValid(false);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const type = reader.result.split(";")[0];
      const docType = type.split("/")[1];
      let base64String = "";
      const indexOfComma = reader.result.indexOf(",");
      if (indexOfComma !== -1) {
        base64String = reader.result.substring(indexOfComma + 1);
      }
      setDocFormat(docType);
      setFileData(base64String);
    };
    reader.readAsDataURL(file);
  }
  const delDoc = async (index) => {
    const data = docDetails[index];
    const response = await putApiData(
      `api/LeaveDocuments/ActivateDeactivate/${data.docId}?isActive=false`
    );
    if (response.success === true) {
      toast.success("Document deleted successfully", {
        position: "top-right",
        autoClose: 2000,
      });
      toggle();
    }
  };
  const viewDoc = (index, bDownbload) => {
    const data = docDetails[index];
    handleDownloadFile(data, bDownbload);
  };

  const handleDownloadFile = (data, bDownload) => {
    // const data = viewResponse[index];
    const byteChars = atob(data.document);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);

    if (bDownload) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${data.documentName || "document"}.${
        data.contentType !== null ? data.contentType : "png"
      }`;
      link.click();
    } else {
      window.open(imageUrl, "_blank");
    }

    URL.revokeObjectURL(imageUrl);
  };

  const approveOrRejectLeave = async (flag, currentLeaveReqId) => {
    try {
      const data = { status: flag };
      if (flag === "2") {
        // console.log("Agent ID to approve " + approveAgentUid);
        const response = await putApiData(
          `api/Leave/Approve_Reject/${currentLeaveReqId}`,
          JSON.stringify(data)
        );
        if (response.success === true) {
                if (flag === "2") {
          toast.success("Leave Request approved", {
            position: "top-right",
            autoClose: 2000,
          });
          toggle();
          //   getPendingLeaveDetails();
          const timer = setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } else {
        if (leaveValidation.values.comments === "") {
          alert("Please provide the rejection reason in the comments");
          return;
        } else {
          const response = await putApiData(
            `api/Leave/Approve_Reject/${currentLeaveReqId}`,
            JSON.stringify(data)
          );

          if (response.success === true) {
            toast.success("Leave Request Rejected", {
              position: "top-right",
              autoClose: 2000,
            });
            toggle();
            // getPendingLeaveDetails();
            const timer = setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
          <div className="page-title-box p-4">
            <h4 className="mb-sm-0 font-size-18">Leave Requests</h4>
          </div>
          <Modal
            isOpen={isOpen}
            toggle={toggle}
            // onClosed={() => {
            //   leaveValidation.resetForm();
            // }}
            name="Apply Leave"
            size="lg"
            role="dialog"
          >
            <ModalHeader toggle={toggle}>Leave Request Details</ModalHeader>
            <Card className="overflow-hidden">
              <div className="modal-body">
                <Form
                  className="needs-validation"
                  onSubmit={leaveValidation.handleSubmit}
                >
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="uName">UserName</Label>
                        <Input
                          type="input"
                          name="userName"
                          id="userName"
                          value={leaveValidation.values.uName}
                          disabled={true}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.uName}
                        >
                          {leaveValidation.errors.uName && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.uName}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="leaveTypeId">Leave Type</Label>
                        <Select
                          name="leaveTypeId"
                          id="leaveTypeId"
                          value={leaveValidation.values.leaveTypeId}
                          onChange={(selectedOption) => {
                            leaveValidation.setFieldValue(
                              "leaveTypeId",
                              selectedOption
                            );
                          }}
                          options={leaveTypes}
                          isDisabled={viewMode}
                        ></Select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3"></div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="fromDate" className="text-left">
                          Leave start Date
                        </Label>
                        <Input
                          type="date"
                          name="fromDate"
                          id="fromDate"
                          value={leaveValidation.values.fromDate}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.fromDate}
                        >
                          {leaveValidation.errors.fromDate && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.fromDate}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="toDate" className="text-left">
                          Leave End Date
                        </Label>
                        <Input
                          type="date"
                          name="toDate"
                          id="toDate"
                          value={leaveValidation.values.toDate}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.toDate}
                        >
                          {leaveValidation.errors.toDate && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.toDate}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="reason">Reason for Leave</Label>
                        <Input
                          type="textarea"
                          name="reason"
                          id="reason"
                          rows={5}
                          placeholder="Provide the reason for leave"
                          value={leaveValidation.values.reason}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.reason}
                        >
                          {leaveValidation.errors.reason && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.reason}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>

                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="leaveDocs" hidden={viewMode}>
                          Upload Supporting Docs
                        </Label>
                        <div className="col-md-12">
                          <Input
                            hidden={viewMode}
                            type="file"
                            id="document"
                            aria-label="Upload"
                            accept=".png, .jpg, .jpeg, .pdf"
                            aria-describedby="inputGroupFileAddon04"
                            multiple
                            onChange={(e) => {
                              handleFileChange(e);
                              leaveValidation.handleChange(e);
                            }}
                            onBlur={leaveValidation.handleBlur}
                            invalid={
                              leaveValidation.touched.proof &&
                              leaveValidation.errors.proof
                                ? true
                                : false
                            }
                          />
                          {leaveValidation.touched.proof &&
                          leaveValidation.errors.proof ? (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.proof}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="mb-3">
                        {proofDoc && (
                          <Label for="viewleaveDocs">
                            Supporting Docs:
                            <div className="mt-3">
                              <p>
                                <small>
                                  Click to view/download the document(s)
                                </small>
                              </p>
                              {docDetails.map((arr, index) => (
                                <Row key={index}>
                                  <div>
                                    <a
                                      href=""
                                      onClick={() => viewDoc(index, false)}
                                    >
                                      Document {index + 1}
                                    </a>
                                    <i
                                      class="icon"
                                      className="m-2"
                                      style={{
                                        color: "green",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => viewDoc(index, true)}
                                    >
                                      {download()}
                                    </i>
                                    <i
                                      class="icon"
                                      className="m-2"
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => delDoc(index)}
                                    >
                                      {trash()}
                                    </i>
                                  </div>
                                </Row>
                              ))}
                            </div>
                          </Label>
                        )}
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="reviewedBy" hidden={viewMode}>
                          Reviewed By:
                        </Label>
                        <Input
                          type="input"
                          name="reviewedBy"
                          id="reviewedBy"
                          placeholder=""
                          value={leaveValidation.values.reViewedBy}
                          disabled={!viewMode}
                          hidden={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.reViewedBy}
                        >
                          {leaveValidation.errors.reViewedBy && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.reViewedBy}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <div className="mb-3">
                      <Label for="comments" hidden={!viewMode}>
                        {" "}
                        Reviewer Comments:{" "}
                        {/* <small>Comments are mandatory for Rejection</small> */}
                      </Label>
                      <Input
                        type="textarea"
                        name="comments"
                        id="comments"
                        rows={2}
                        placeholder="Please provide comments if any!"
                        value={leaveValidation.values.comments || null}
                        hidden={!viewMode}
                        onChange={leaveValidation.handleChange}
                      />
                    </div>
                  </Row>
                </Form>
                <Row>
                  <div className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn m-3"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                      }}
                      hidden={!viewMode}
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Approve button clicked");
                        approveOrRejectLeave("2", leaveRequest.leaveId);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      className="btn m-3"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                      }}
                      hidden={!viewMode}
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Reject button clicked");
                        approveOrRejectLeave("3", leaveRequest.leaveId);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      // type="submit"
                      className="btn m-3"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      hidden={viewMode}
                      onClick={() => {
                        // event.stopPropagation();
                        console.log("Save Changes clicked");
                        leaveValidation.handleSubmit();
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </Row>
              </div>
            </Card>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default LeaveRequestModal;
