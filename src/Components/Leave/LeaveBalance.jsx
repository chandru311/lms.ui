import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getApiData } from "../../Common/helpers/axiosHelper";

const LeaveBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      setIsLoading(true);
      const response = await getApiData("api/Leave/GetLeaveBalance");
      setIsLoading(false);

      const mappedResponse = response.data.map((data) => ({
        leaveTypeName: data.leaveTypeName,
        totalDays: data.totalDays,
        remainingDays: data.remainingDays,
      }));

      setLeaves(mappedResponse);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <Container fluid style={{ fontFamily: "Poppins" }}>
      <div className="container mt-2">
        <div className="row">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            leaves.map((leave, index) => (
              <div key={index} className="col-sm-6 col-lg-3 mb-4">
                <div className="card">
                  <div
                    className="card-header text-white"
                    style={{
                      backgroundColor: "#5e2ced",
                      fontSize: "20px",
                    }}
                  >
                    {leave.leaveTypeName}
                  </div>
                  <div className="card-body">
                    <h4 className="mt-2">
                      {leave.remainingDays}/{leave.totalDays}
                    </h4>
                    <p
                      className="mt-4 mb-2"
                      style={{
                        fontSize: "15px",
                        color: "green",
                      }}
                    >
                      Currently Available
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default LeaveBalance;

/*
import React from "react";

const LeaveBalance = () => {
  const leaves = [
    {
      type: "Casual Leave",
      balance: "12/12",
    },
    {
      type: "Sick Leave",
      balance: "05/12",
    },
    {
      type: "Paid Leave",
      balance: "12/12",
    },
    {
      type: "Vacation Leave",
      balance: "02/06",
    },
    {
      type: "Comp-Off Leave",
      balance: "04/05",
    },
    {
      type: "Unpaid Leave",
      balance: "06/15",
    },
    {
      type: "Others",
      balance: "06/15",
    },
  ];

  return (
    <div className="container mt-2">
      <div className="row">
        {leaves.map((leave, index) => (
          <div key={index} className="col-sm-6 col-lg-3 mb-4">
            <div className="card">
              <div
                className="card-header text-white"
                style={{
                  backgroundColor: "#5e2ced",
                  fontSize: "20px",
                }}
              >
                {leave.type}
              </div>
              <div className="card-body  ">
                <h4 className="mt-2">{leave.balance}</h4>
                <p
                  className="mt-4 mb-2"
                  style={{
                    fontSize: "15px",
                    color: "green",
                  }}
                >
                  Currently Available
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;
*/
