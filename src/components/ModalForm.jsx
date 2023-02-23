import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  emailValidation,
  mobileValidation,
  nameValidation,
  validateZipCode,
} from "../utils/Helper";

export const ModalForm = ({ show, setShow, onSubmit }) => {
  // for input update
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //Error Message
  const [emailError, setEmailError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [error, setError] = useState(false);

  // Email Validation
  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
    const err_msg = emailValidation(value);
    setEmailError(err_msg);
  }

  //Name Validation
  function handleFNameChange(event) {
    const value = event.target.value;
    setFirstName(value);
    const err_msg = nameValidation(value);
    setFnameError(err_msg);
  }
  //Name Validation
  function handleLNameChange(event) {
    const value = event.target.value;
    setLastName(value);
    const err_msg = nameValidation(value);
    setLnameError(err_msg);
  }

  //Phone Validaton
  function handlePhoneChange(event) {
    const value = event.target.value;
    setPhone(value);
    const err_msg = mobileValidation(value);
    setPhoneError(err_msg);
  }

  //Zipcode Validation
  function handleZipCode(event) {
    const value = event.target.value;
    setZip(value);
    const err_msg = validateZipCode(value);
    setZipCodeError(err_msg);
  }

  const handleClose = () => {
    setShow(false);
    setError(false);
    setFirstName("");
    setLastName("");
    setCity("");
    setState("");
    setZip("");
    setPhone("");
    setEmail("");
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      phone,
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
      if (
        emailError !== "" ||
        fNameError !== "" ||
        lNameError !== "" ||
        phoneError !== ""
      ) {
        setError(true);
      }
      onSubmit(data);
      setShow(false);
      setError(false);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
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
              <Form.Group as={Col} controlId="formGridFName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={handleFNameChange}
                  placeholder="Alex"
                />
                {fNameError && (
                  <Form.Text className="text-danger">{fNameError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={handleLNameChange}
                  placeholder="Jone"
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
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@test.com"
                />
                {emailError && (
                  <Form.Text className="text-danger">{emailError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="0123456789"
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
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  name="zip"
                  type="number"
                  value={zip}
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
