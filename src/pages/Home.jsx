import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import { ModalForm } from "../components/ModalForm";
import NoData from "../components/NoData";
import { useUserAuth } from "../context/UserAuthContext";
import { auth } from "../firebase/init";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [empList, setEmpList] = useState([]);

  const { addEmployee, fetchEmpData, isUpdated, setIsUpdated } = useUserAuth();

  const handleShow = () => setShow(true);

  const handleFormData = (data) => {
    addEmpToFirebase(data);
  };

  const addEmpToFirebase = (data) => {
    const user = auth.currentUser;
    console.log("current logged user - " + user.email + " " + user.uid);
    const isUpdated = addEmployee(user, data);
    setIsUpdated(isUpdated);
    console.log(isUpdated);
  };

  useEffect(() => {
    fetchEmpData()
      .then((fetchedData) => {
        const flatData = fetchedData.flat(); // Flatten the array of arrays

        console.log(flatData);
        setEmpList(flatData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isUpdated, fetchEmpData]);

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
        {empList.length !== 0 ? (
          <EmployeesTable empList={empList} />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};
