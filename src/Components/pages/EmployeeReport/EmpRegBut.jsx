import React, { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
// import NewEmpReg from './NewEmpReg';
import EmpRegTAB from "./EmpRegTAB";
import EmpRegNav from "./EmpRegNav";

function EmpRegBut() {
  // const [addModal, setAddModal] = useState(false);
  // const toggleAddEmp = () => setAddModal(!addModal);
  const [isOpen, setIsOpen] = useState(false);
  const toggleAddEmp = () => setIsOpen(!isOpen);
  return (
    <div>
      {/* <NewEmpReg isOpen={addModal} toggle={toggleAddEmp}/> */}
      {/* <NewEmpReg isOpen={isOpen} toggle={toggleAddEmp} /> */}
      {/* <EmpRegTAB isOpen={isOpen} toggle={toggleAddEmp} /> */}
      <EmpRegNav isOpen={isOpen} toggle={toggleAddEmp} />

      {/* branch={branch} getAllSystemUser={getAdmin} */}

      <Card>
        <CardBody>
          <div className="text-sm-end">
            <Button
              type="button"
              color="primary"
              onClick={toggleAddEmp}
              className="btn mb-2 me-2"
            >
              <i className="mdi mdi-plus-circle-outline me-1" />
              NewEmployee Registration
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmpRegBut;
