import React, { useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  Button,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  Card,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
// import TableContainer from '../../Components/Common/TableContainer';

const LeaveAdministration = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: null,
    endDate: null,
    reason: "",
    isFullDay: false,
  });

  const [validation, setValidation] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const columns = ["Leave type", "reason"];

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Leave application submitted:", formData);
      setFormData({
        leaveType: "",
        startDate: null,
        endDate: null,
        reason: "",
        isFullDay: false,
      });
    }
  };

  function FileUpload() {
    const handleChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  }

  return (
    <div className="page-content">
      <Container fluid>
        <ToastContainer closeButton={false} limit={1} />
        {/* <Row className="justify-content-center"> */}
        <Col md={8} lg={6} xl={5}>
          <header className="App-header">Apply Leave</header>
          <Card className="overflow-hidden">
            <Col className="col-12">
              <div className="p-3 text-left">
                <h5>Leave Application Form</h5>
                <div class="text-left">
                  Please provide information about your leave
                </div>
              </div>
            </Col>

            <Form onSubmit={handleSubmit}>
              <Row className="p-3 fs-12 fw-bold">
                <Col lg={12}>
                  <FormGroup>
                    <Label for="leaveType">Leave Type</Label>
                    <RequiredAsterisk />
                    <Input
                      type="select"
                      name="leaveType"
                      id="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                      invalid={!!validation.leaveType}
                    >
                      <option value="">Select Leave Type</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual">Casual Leave</option>
                      <option value="earned">Earned Leave</option>
                    </Input>

                    <FormFeedback>{validation.leaveType}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <Label for="startDate" className="text-left">
                      Leave start Date
                    </Label>
                    <RequiredAsterisk />
                    <Input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      invalid={!!validation.startDate}
                    />
                    <FormFeedback>{validation.startDate}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <Label for="endDate">Leave end Date</Label>
                    <RequiredAsterisk />
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      invalid={!!validation.endDate}
                    />
                    <FormFeedback>{validation.endDate}</FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <Label for="reason">Reason for Leave</Label>
                    <RequiredAsterisk />
                    <Input
                      type="textarea"
                      name="reason"
                      id="reason"
                      rows={5}
                      placeholder="Provide the reason for leave"
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <div>
                  <Input type="file" onChange={FileUpload} className="mb-3" />
                  {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                </div>
                <div className="d-flex justify-content-center ">
                  <Button
                    type="submit"
                    className="mb-3 rounded flex-grow-1"
                    style={{ backgroundColor: "#00AFB9" }}
                  >
                    Apply Leave{" "}
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
        </Col>
        {/* <TableContainer>
          columns={columns}
           data={formData}
          </TableContainer> */}
      </Container>
    </div>
  );
};

export default LeaveAdministration;
