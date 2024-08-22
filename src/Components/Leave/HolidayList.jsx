import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import TableContainer from "../../Common/components/TableContainer";
import Loader from "../../Common/components/Loader";
import { getApiData } from "../../Common/helpers/axiosHelper";
import { toast, ToastContainer } from "react-toastify";

const HolidayList = () => {
  const [isLoading, setIsLoading] = useState(false);
  //const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [holiday, setHoliday] = useState([]);

  const fetchHolidays = async () => {
    try {
      setIsLoading(true);
      const response = await getApiData("api/Leave/GetAllPublicHolidays");
      setIsLoading(false);

      const mappedResponse = response.data.map((data) => ({
        id: data.id,
        date: data.date,
        name: data.name,
        active: data.active,
      }));

      setHoliday(mappedResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const columns = [
    {
      Header: "NO",
      accessor: "id",
      filterable: false,
      disableFilters: true,
    },
    {
      Header: "Date",
      accessor: "date",
      filterable: false,
      disableFilters: true,
    },
    {
      Header: "Name",
      accessor: "name",
      filterable: false,
      disableFilters: true,
    },
  ];

  return (
    // <Card style={{ marginTop: "30px" }}>
    <div style={{ marginLeft: "15px" }}>
      <CardBody>
        <CardTitle>
          <h4 className="mt-2">Holiday List</h4>
        </CardTitle>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <TableContainer
            columns={columns}
            data={holiday}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={10}
            isPageSelect={false}
          />
        )}
      </CardBody>
    </div>
    //</Card>
  );
};

export default HolidayList;
