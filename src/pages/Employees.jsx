import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import { ModalForm } from "../components/ModalForm";
import { auth } from "../firebase/init";
import EmpDataServices from "../services/emp.services";

export const Employees = () => {
  const [show, setShow] = useState(false);
  const [empList, setEmpList] = useState([]);

  const handleShow = () => setShow(true);

  const handleFormData = (data) => {
    addEmpToFirebase(data);
  };

  const addEmpToFirebase = (data) => {
    const user = auth.currentUser;
    console.log("current logged user - " + user.email + " " + user.uid);
    EmpDataServices.addEmployee(user, data);
  };

  useEffect(() => {
    EmpDataServices.fetchEmpData()
      .then((fetchedData) => {
        const flatData = fetchedData.flat(); // Flatten the array of arrays

        console.log(flatData);
        setEmpList(flatData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [show]);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h5>Employee Details</h5>
          <button className="btn btn-primary" onClick={handleShow}>
            Add Employee
          </button>
          <ModalForm show={show} setShow={setShow} onSubmit={handleFormData} />
        </div>
      </div>
      <div className="row mt-5">
        <EmployeesTable empList={empList} />
      </div>
    </div>
  );
};
