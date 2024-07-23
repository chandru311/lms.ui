import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const leaveBalance = {
  casualLeave: 12,
  sickLeave: 15,
  earnedLeave: 8,
  leaveWithoutPay: 8,
  others: 20,
};

const showLeaveBalance = () => {
  MySwal.fire({
    title: "Leave Balance",
    html: (
      <div>
        <p>
          <strong>Casual Leave:</strong> {leaveBalance.casualLeave}
        </p>
        <p>
          <strong>Sick Leave:</strong> {leaveBalance.sickLeave}
        </p>
        <p>
          <strong>Earned Leave:</strong> {leaveBalance.earnedLeave}
        </p>
        <p>
          <strong>Leave Without Pay:</strong> {leaveBalance.leaveWithoutPay}
        </p>
        <p>
          <strong>Others:</strong> {leaveBalance.others}
        </p>
      </div>
    ),
    icon: "info",
    confirmButtonText: "OK",
  });
};

const LeaveBalance = () => {
  const leaves = [
    {
      type: "Paid Leave",
      balance: "12/12",
      bgColor: "bg-orange-100",
      textColor: "text-black font-medium",
    },
    {
      type: "Vacation Leave",
      balance: "02/06",
      bgColor: "bg-pink-100",
      textColor: "text-black font-medium",
    },
    {
      type: "Comp-Off Leave",
      balance: "04/05",
      bgColor: "bg-blue-100",
      textColor: "text-black font-medium",
    },
    {
      type: "Unpaid Leave",
      balance: "06/15",
      bgColor: "bg-red-100",
      textColor: "text-black font-medium",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 mb-4">
        {leaves.map((leave, index) => (
          <div
            key={index}
            className="flex-1 mx-2 bg-white rounded-lg shadow-lg text-center relative"
            style={{ marginBottom: "10px" }}
          >
            <div
              className={`py-3 px-4 rounded-t-lg ${leave.bgColor} ${leave.textColor} text-lg font-bold`}
            >
              {leave.type}
            </div>
            <div className="bg-white p-3 rounded-b-lg">
              <p className="text-xl font-semibold mt-2">{leave.balance}</p>
              <p className="text-gray-500 mt-1">Currently Available</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-10">
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-5"
          onClick={showLeaveBalance}
        >
          Show Leave Balance
        </button>
      </div>
    </div>
  );
};

export default LeaveBalance;
