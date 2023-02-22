import { collection, doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/init";
import { UpdateModal } from "./UpdateModal";

function EmployeesTable({ empList }) {
  const { isUpdated, setIsUpdated, deleteEmployee, user } = useUserAuth();
  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);
    setIsUpdated(!isUpdated);
  };

  const handleUpdate = (id) => {
    setShow(true);
    console.log("clikk");

    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, user.uid);
    const empsRef = collection(userDocRef, "employees");
    const empDocRef = doc(empsRef, id);

    getDoc(empDocRef)
      .then((doc) => {
        if (doc.exists()) {
          const empData = doc.data();
          // console.log(empData);
          setUpdateData({ empData });
        } else {
          console.log("employee not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {empList &&
            empList.map((e) => (
              <tr key={e.id}>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.city}</td>
                <td>{e.state}</td>
                <td>{e.zip}</td>
                <td>
                  <FiEdit
                    cursor="pointer"
                    onClick={() => handleUpdate(e.id)}
                    className="me-4"
                  />
                  <FiTrash2
                    cursor="pointer"
                    onClick={() => handleDelete(e.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <UpdateModal show={show} setShow={setShow} updateData={updateData} />
    </>
  );
}

export default EmployeesTable;
