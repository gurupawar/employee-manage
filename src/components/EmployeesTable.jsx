import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserAuth } from "../context/UserAuthContext";
import NoData from "./NoData";

import { UpdateModal } from "./UpdateModal";

function EmployeesTable({ empList }) {
  const { isUpdated, setIsUpdated, deleteEmployee } = useUserAuth();
  const [show, setShow] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const handleDelete = (id) => {
    deleteEmployee(id);
    setIsUpdated(!isUpdated);
  };

  const handleUpdate = (e) => {
    setShow(true);
    console.log("clicked -" + e.id);
    // console.log(e);
    setUpdateData({
      id: e.id,
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      phone: e.phone,
      city: e.city,
      state: e.state,
      zip: e.zip,
    });
  };

  return (
    <>
      {empList.length != 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
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
                  <td>{e.email}</td>
                  <td>{e.phone}</td>
                  <td>{e.city}</td>
                  <td>{e.state}</td>
                  <td>{e.zip}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <FiEdit
                        cursor="pointer"
                        color="green"
                        onClick={() => handleUpdate(e)}
                      />
                      <FiTrash2
                        color="red"
                        cursor="pointer"
                        onClick={() => handleDelete(e.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <NoData />
      )}

      <UpdateModal show={show} setShow={setShow} updateData={updateData} />
    </>
  );
}

export default EmployeesTable;
