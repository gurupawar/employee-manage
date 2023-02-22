import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export const UpdateModal = ({ show, setShow, updateData }) => {
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const upData = updateData.empData;
  const handleClose = () => {
    setShow(false);
    setError(false);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      city,
      state,
      zip,
    };

    if (
      firstName === "" ||
      lastName === "" ||
      city === "" ||
      state === "" ||
      zip === ""
    ) {
      setError(true);
    } else {
      setShow(false);
      setError(false);
      setFirstName("");
      setLastName("");
      setCity("");
      setState("");
      setZip("");
    }
  }

  return (
    <>
      <Modal size="lg" show={show} centered>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {error ? (
              <div
                className="alert alert-danger text-center mx-auto"
                style={{ maxWidth: "400px" }}
                role="alert"
              >
                All fields are mandatory!
              </div>
            ) : (
              ""
            )}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Jone"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  name="zip"
                  type="number"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
