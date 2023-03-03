import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import {
  emailValidation,
  mobileValidation,
  nameValidation,
  validateZipCode,
} from "../utils/Helper";

export const UpdateModal = ({ show, setShow, updateData }) => {
  const { id, firstName, lastName, email, phone, city, state, zip } =
    updateData;

  const [error, setError] = useState(false);

  // for input update
  const [updateFN, setUpdateFN] = useState("");
  const [updateLN, setUpdateLN] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [UpdateState, setUpdateState] = useState("");
  const [updateZip, setUpdateZip] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");

  //Error Message
  const [emailError, setEmailError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

  const { updateEmployee, user, isUpdated, setIsUpdated } = useUserAuth();

  // Email Validation
  function handleEmailChange(event) {
    const value = event.target.value;
    setUpdateEmail(value);
    const err_msg = emailValidation(value);
    setEmailError(err_msg);
  }

  //Name Validation
  function handleFNameChange(event) {
    const value = event.target.value;
    setUpdateFN(value);
    const err_msg = nameValidation(value);
    setFnameError(err_msg);
  }
  //Name Validation
  function handleLNameChange(event) {
    const value = event.target.value;
    setUpdateLN(value);
    const err_msg = nameValidation(value);
    setLnameError(err_msg);
  }

  //Phone Validaton
  function handlePhoneChange(event) {
    const value = event.target.value;
    setUpdatePhone(value);
    const err_msg = mobileValidation(value);
    setPhoneError(err_msg);
  }

  //Zipcode Validation
  function handleZipCode(event) {
    const value = event.target.value;
    setUpdateZip(value);
    const err_msg = validateZipCode(value);
    setZipCodeError(err_msg);
  }

  const handleClose = () => {
    setShow(false);
    setError(false);
  };

  useEffect(() => {
    setUpdateFN(firstName || "");
    setUpdateLN(lastName || "");
    setUpdateCity(city || "");
    setUpdateState(state || "");
    setUpdatePhone(phone || "");
    setUpdateEmail(email || "");
    setUpdateZip(zip || "");
  }, [city, email, firstName, lastName, phone, show, state, zip]);

  function handleSubmit(event) {
    event.preventDefault();

    const updatedEmployeeData = {
      id,
      firstName: updateFN,
      lastName: updateLN,
      email: updateEmail,
      phone: updatePhone,
      city: updateCity,
      state: UpdateState,
      zip: updateZip,
    };

    setShow(false);

    if (
      updateFN === "" ||
      updateLN === "" ||
      updateCity === "" ||
      UpdateState === "" ||
      updateZip === "" ||
      updateEmail === "" ||
      updatePhone === ""
    ) {
      setError(true);
    } else {
      updateEmployee(id, user, updatedEmployeeData);
      setIsUpdated(!isUpdated);
      setShow(false);
      setError(false);
      setUpdateFN("");
      setUpdateLN("");
      setUpdateCity("");
      setUpdateState("");
      setUpdatePhone("");
      setUpdateEmail("");
      setUpdateZip("");
    }
  }

  return (
    <>
      <Modal size="lg" show={show} centered>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Update Employee</Modal.Title>
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
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updateFN}
                  onChange={handleFNameChange}
                />
                {fNameError && (
                  <Form.Text className="text-danger">{fNameError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updateLN}
                  onChange={handleLNameChange}
                />
                {lNameError && (
                  <Form.Text className="text-danger">{lNameError}</Form.Text>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={updateEmail}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <Form.Text className="text-danger">{emailError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={updatePhone}
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <Form.Text className="text-danger">{phoneError}</Form.Text>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={updateCity}
                  onChange={(e) => setUpdateCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  type="text"
                  value={UpdateState}
                  onChange={(e) => setUpdateState(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  name="zip"
                  type="number"
                  value={updateZip}
                  onChange={handleZipCode}
                />
                {zipCodeError && (
                  <Form.Text className="text-danger">{zipCodeError}</Form.Text>
                )}
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
