import React, { useEffect, useState } from "react";
import { getApiData, postApiData } from "../../Common/helpers/axiosHelper";

export const authUser = await JSON.parse(sessionStorage.getItem("authUser"));
export const userRole = authUser?.userType;

export const useLeaveTypes = () => {
  const [leaveTypes, setLeaveTypeOptions] = useState([]);

  const mapLeaveTypes = (leaveTypes) => {
    if (!leaveTypes) return [];
    return leaveTypes.map((e) => ({
      label: e.name,
      value: e.leaveTypeId,
    }));
  };

  const getLeaveTypes = async () => {
    try {
      const response = await getApiData(`api/LeaveType`);
      setLeaveTypeOptions(mapLeaveTypes(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return { leaveTypes, getLeaveTypes };
};
