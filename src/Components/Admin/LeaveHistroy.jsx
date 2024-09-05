import React, { useEffect, useMemo, useState } from 'react';
import { Button, Badge, Card, CardBody, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import TableContainer from '../../Common/components/TableContainer';
import Loader from '../../Common/components/Loader';
import { getApiData } from '../../Common/helpers/axiosHelper';
import 'react-toastify/dist/ReactToastify.css';
import { view } from '../../Common/common/icons';
import { mapStatus } from '../../Common/common/StatusLabels';
import '../../Common/common/status.css';

const LeaveHistory = () => {
    document.title = "Leave Histroy";
    const [leaveData, setLeaveData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [currentProof, setCurrentProof] = useState(null);
    const [noDocumentMessage, setNoDocumentMessage] = useState('');

    const toggleModal = () => setModal(!modal);

    const fetchLeaveData = async () => {
        setIsLoading(true);
        try {
            const response = await getApiData('api/Leave/GetAllLeaves');
            const mappedResponse = response.data.map((item, index) => ({
                name: item.firstName,
                reason: item.reason,
                leaveType: item.leaveTypeName,
                index: index + 1,
                fromDate: item.fromDate,
                toDate: item.toDate,
                status: mapStatus(item.status),
                proof: item.proof,
            }));
            setLeaveData(mappedResponse);
        } catch (error) {
            console.error('Error fetching leave data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveData();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Reason',
                accessor: 'reason',
            },
            {
                Header: 'Leave Type',
                accessor: 'leaveType',
            },
            {
                Header: 'From Date',
                accessor: 'fromDate',
            },
            {
                Header: 'To Date',
                accessor: 'toDate',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => {
                    return (
                        <Badge className={`font-size-11 badge-${value.color}`}>
                            {value.label}
                        </Badge>
                    );
                },
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    row.original.proof ? (
                        <Button
                            color="primary"
                            type="button"
                            title="View Proof"
                            className="btn-sm btn-rounded"
                            style={{ marginRight: '5px', color: '#fff', background: '#4458b8', border: 'none' }}
                            aria-label="view"
                            onClick={() => {
                                setCurrentProof(row.original.proof);
                                setNoDocumentMessage('');
                                toggleModal();
                            }}
                        >
                            {view()}
                        </Button>
                    ) : (
                        <p
                           
                            title="No Document"
                                style={{ fontFamily: 'Poppins' }}
                          
                            aria-label="no-document"
                            onClick={() => {
                                setCurrentProof(null);
                                setNoDocumentMessage('No document available');
                                toggleModal();
                            }}
                        >
                            No Document
                        </p>
                    )
                ),
            }
        ],
        []
    );

    return (
        <Container fluid style={{ fontFamily: 'Poppins' }}>
            <h2 className="text-center my-4" style={{ color: '#5e2ced' }}>Leave History</h2>
            {isLoading ? (
                <Loader />
            ) : (
                <Card>
                    <CardBody>
                        <TableContainer
                            columns={columns}
                            data={leaveData}
                            isGlobalFilter={true}
                            customPageSize={10}
                            isPageSelect={true}
                        />
                    </CardBody>
                </Card>
            )}
            <Modal isOpen={modal} toggle={toggleModal} style={{ fontFamily: 'Poppins' }}>
                <ModalHeader toggle={toggleModal}>Proof Document</ModalHeader>
                <ModalBody>
                    {currentProof ? (
                        <img src={currentProof} alt="Proof Document" style={{ width: '100%' }} />
                    ) : (
                        <p>{noDocumentMessage}</p>
                    )}
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default LeaveHistory;
