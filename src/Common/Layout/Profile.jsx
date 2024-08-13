import React, { useState, useEffect } from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    ModalFooter,
    FormFeedback,
} from "reactstrap";
import Loader from "../components/Loader";
import { getApiData, putApiData } from "../helpers/axiosHelper";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";

const Profile = ({ isOpen, toggle, userId }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const response = await getApiData(`api/Manager/GetManagerByUId`);
            setProfileData(response.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           
            firstName: profileData?.firstName || "",
            lastName: profileData?.lastName || "",
     
            dob: profileData?.dob || "",
            userName: profileData?.userName || "",
            email: profileData?.email || "",
            mobileNumber: profileData?.mobileNumber || "",
            gender: profileData?.gender || "",
            maritalStatus: profileData?.maritalStatus || "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Please Enter First Name"),
            lastName: Yup.string().required("Please Enter Last Name"),
            dob: Yup.date().required("Please Enter Date of Birth"),
            mobileNumber: Yup.string()
                .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
                .required("Please Enter Mobile Number"),
            email: Yup.string().email('Invalid Email Address').required("Please Enter Email"),
            gender: Yup.string().required("Please Select Gender"),
            maritalStatus: Yup.string().required("Please Select Marital Status"),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const updatedResponse = await putApiData(`api/Manager/UpdateManager/${profileData?.managerId}`, values);

                if (updatedResponse.success) {
                    toast.success('Profile Updated Successfully', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    toggle();
                } else {
                    toast.error(updatedResponse.message || "Update Failed", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                console.error("Error updating profile data:", error);
                toast.error("Failed to update profile details", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } finally {
                setLoading(false);
            }
        }
          });

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered style={{ fontFamily: 'Poppins' }}>
            <ModalHeader toggle={toggle}>My Profile</ModalHeader>
            <ModalBody>
                {loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName">First Name</Label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        {...formik.getFieldProps("firstName")}
                                        invalid={formik.touched.firstName && !!formik.errors.firstName}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <FormFeedback>{formik.errors.firstName}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        {...formik.getFieldProps("lastName")}
                                        invalid={formik.touched.lastName && !!formik.errors.lastName}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <FormFeedback>{formik.errors.lastName}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="dob">Date of Birth</Label>
                                    <Input
                                        type="date"
                                        id="dob"
                                        {...formik.getFieldProps("dob")}
                                        invalid={formik.touched.dob && !!formik.errors.dob}
                                    />
                                    {formik.touched.dob && formik.errors.dob && (
                                        <FormFeedback>{formik.errors.dob}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Contact Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        {...formik.getFieldProps("email")}
                                        invalid={formik.touched.email && !!formik.errors.email}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <FormFeedback>{formik.errors.email}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="mobileNumber">Mobile Number</Label>
                                    <Input
                                        type="text"
                                        id="mobileNumber"
                                        {...formik.getFieldProps("mobileNumber")}
                                        invalid={formik.touched.mobileNumber && !!formik.errors.mobileNumber}
                                    />
                                    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                                        <FormFeedback>{formik.errors.mobileNumber}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="gender">Gender</Label>
                                    <Input
                                        type="select"
                                        id="gender"
                                        {...formik.getFieldProps("gender")}
                                        invalid={formik.touched.gender && !!formik.errors.gender}
                                    >
                                        <option value="" label="Select Gender" />
                                        <option value="Male" label="Male" />
                                        <option value="Female" label="Female" />
                                        <option value="Other" label="Other" />
                                    </Input>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <FormFeedback>{formik.errors.gender}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="maritalStatus">Marital Status</Label>
                                    <Input
                                        type="select"
                                        id="maritalStatus"
                                        {...formik.getFieldProps("maritalStatus")}
                                        invalid={formik.touched.maritalStatus && !!formik.errors.maritalStatus}
                                    >
                                        <option value="" label="Select Marital Status" />
                                        <option value="Single" label="Single" />
                                        <option value="UnMarried" label="UnMarried" />
                                        <option value="Married" label="Married" />
                                    </Input>
                                    {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                                        <FormFeedback>{formik.errors.maritalStatus}</FormFeedback>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <ModalFooter>
                            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
                                Save Changes
                            </Button>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
            </ModalBody>
            <ToastContainer />
        </Modal>
    );
};

export default Profile;
