import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { emailValidation } from "../utils/Helper";
export const AddEmployee = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    designation: "",
    salary: "",
    pincode: "",
    stateName: "",
    city: "",
    errors: {},
  });

  const { addEmployee, user } = useUserAuth();
  const handleChange = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;

    switch (name) {
      case "email":
        errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Email is not valid";
        break;
      case "salary":
        if (value < 0) {
          errors.salary = "Salary cannot be negative";
        } else if (value > 1000000) {
          errors.salary = "Salary should not exceed 1,000,000";
        } else errors.salary = "";
        break;

      case "firstName":
        if (!/^[A-Za-z- ]+$/.test(value)) {
          errors.firstName = "Please enter a valid input.";
        } else if (value.length < 3) {
          errors.firstName = "Name must be at least 3 characters long.";
        } else if (value.length > 20) {
          errors.firstName = "Name should not greater than 20.";
        } else {
          errors.firstName = "";
        }
        break;
      case "lastName":
        if (!/^[A-Za-z- ]+$/.test(value)) {
          errors.lastName = "Please enter a valid input.";
        } else if (value.length < 3) {
          errors.lastName = "Name must be at least 3 characters long.";
        } else if (value.length > 20) {
          errors.lastName = "Name should not greater than 20.";
        } else {
          errors.lastName = "";
        }
        break;
      case "pincode":
        if (value.length < 6 || value.length > 6) {
          errors.pincode = "Pincode should be 6 digit";
        } else {
          errors.pincode = "";
        }
        break;
      case "mobile":
        if (!/^[0-9]{10}$/.test(value)) {
          errors.mobile = "Pincode should be 6 digit";
        } else {
          errors.mobile = "";
        }
        break;

      case "city":
        if (!/^[A-Za-z- ]+$/.test(value)) {
          errors.city = "Please enter a valid input.";
        } else if (value.length < 3) {
          errors.city = "Must be at least 3 characters long.";
        } else if (value.length > 20) {
          errors.city = "Should not greater than 20.";
        } else {
          errors.city = "";
        }
        break;

      case "designation":
        if (!/^[A-Za-z- ]+$/.test(value)) {
          errors.designation = "Please enter a valid input.";
        } else if (value.length < 3) {
          errors.designation = "Must be at least 3 characters long.";
        } else if (value.length > 20) {
          errors.designation = "Should not greater than 20.";
        } else {
          errors.designation = "";
        }
        break;

      case "stateName":
        if (!/^[A-Za-z- ]+$/.test(value)) {
          errors.stateName = "Please enter a valid input.";
        } else if (value.length < 3) {
          errors.stateName = "Must be at least 3 characters long.";
        } else if (value.length > 20) {
          errors.stateName = "Should not greater than 20.";
        } else {
          errors.stateName = "";
        }
        break;

      case "dob":
        if (value === "") {
          errors.dob = "Please enter a valid input.";
        } else {
          errors.dob = "";
        }
        break;

      default:
        break;
    }

    setState({ ...state, [name]: value, errors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      firstName,
      lastName,
      mobile,
      city,
      salary,
      stateName,
      dob,
      designation,
      pincode,
    } = state;

    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!firstName) {
      errors.firstName = "FistName is required";
    }

    if (!lastName) {
      errors.lastName = "FistName is required";
    }
    if (!mobile) {
      errors.mobile = "Mobile number is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!stateName) {
      errors.stateName = "State is required";
    }

    if (!salary) {
      errors.salary = "Salary is required";
    }
    if (!dob) {
      errors.dob = "DOB is required";
    }
    if (!designation) {
      errors.designation = "Designation is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    }

    if (Object.keys(errors).length > 0) {
      setState({ ...state, errors });
      return;
    }

    console.log("clicked");

    // Submit form data here
    // const { fn, ...newData } = state;

    // delete newData.errors;
    // addEmployee(user, newData);
  };

  return (
    <div className="container py-4">
      <div className="col-md-6 col-12  mx-auto">
        <div className="card border-0 shadow  mx-auto p-4 text-start">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  value={state.firstName}
                  onChange={handleChange}
                  isInvalid={!!state.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="col-lg-6 col-xs-12 col-sm-6 mt-3 mt-sm-0">
                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={state.lastName}
                    onChange={handleChange}
                    isInvalid={!!state.errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <div className="col-lg-6 col-xs-12 col-sm-6">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                    value={state.email}
                    onChange={handleChange}
                    isInvalid={!!state.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-lg-6 col-xs-12 col-sm-6 mt-3 mt-sm-0">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control
                    name="mobile"
                    type="number"
                    placeholder="1234567890"
                    value={state.mobile}
                    onChange={handleChange}
                    isInvalid={!!state.errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  name="dob"
                  type="date"
                  value={state.dob}
                  onChange={handleChange}
                  isInvalid={!!state.errors.dob}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.dob}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  name="designation"
                  placeholder="Tester"
                  value={state.designation}
                  onChange={handleChange}
                  isInvalid={!!state.errors.designation}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.designation}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col-lg-6 col-xs-12 col-sm-12 mt-3 mt-lg-0">
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    name="salary"
                    type="number"
                    placeholder="0.000"
                    value={state.salary}
                    onChange={handleChange}
                    isInvalid={!!state.errors.salary}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.salary}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  placeholder="Pune"
                  value={state.city}
                  onChange={handleChange}
                  isInvalid={!!state.errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="stateName"
                  type="text"
                  placeholder="Maharashatra"
                  value={state.stateName}
                  onChange={handleChange}
                  isInvalid={!!state.errors.stateName}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.stateName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  name="pincode"
                  type="number"
                  placeholder="411052"
                  value={state.pincode}
                  onChange={handleChange}
                  isInvalid={!!state.errors.pincode}
                />
                <Form.Control.Feedback type="invalid">
                  {state.errors.pincode}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
