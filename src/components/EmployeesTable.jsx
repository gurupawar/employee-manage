import React from "react";
import { Table } from "react-bootstrap";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EmpDataServices from "../services/emp.services";

function EmployeesTable({ empList }) {
  const handleDelete = (id) => {
    EmpDataServices.deleteTodo(id);
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
                    onClick={() => console.log("clicked" + e.id)}
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
    </>
  );
}

export default EmployeesTable;
