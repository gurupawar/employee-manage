import React, { useState } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import {
  passwordValidation,
  confirmPasswordValidation,
  emailValidation,
} from "../utils/Helper";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [ConfirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const { register } = useUserAuth();

  // Email Validation
  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
    const err_msg = emailValidation(value);
    setEmailError(err_msg);
  }
  // Password Validation
  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    const err_msg = passwordValidation(value); // Password Validation Function
    setPasswordError(err_msg);
  }

  //Confirm Password Validation
  function handleConfirmPasswordChange(event) {
    const value = event.target.value;
    setConfirmPassword(value);
    const err_msg = confirmPasswordValidation(password, value); // Confirm Password Validation Function
    setConfirmPassError(err_msg);
  }

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "" || password === "" || confirmPassword === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
    } else {
      if (password === confirmPassword) {
        console.log("register called from emp.services");
        const firebaseMsg = await register(email, password);
        if (firebaseMsg) {
          setMessage({ error: true, msg: firebaseMsg });
        } else {
          navigate("/"); // after successfull acc createion user redirect to login page
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMessage({
            error: false,
            msg: "Registration Successful! You can login now",
          });
        }
      } else {
        setMessage({ error: true, msg: "Confirm password do not match!" });
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = () => {
    setConfirmPasswordShown(!ConfirmpasswordShown);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <Card className="p-4 mt-5 mx-auto" style={{ maxWidth: "500px" }}>
            <Card.Title>Register</Card.Title>

            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "success"}
                dismissible
                onClick={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
            <Form className="text-start" onSubmit={handleRegister}>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <InputGroup className="mb-1">
                  <Form.Control
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="Enter email"
                  />
                </InputGroup>
                {emailError && (
                  <Form.Text className="text-danger">{emailError}</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPasswrod">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-1">
                  <Form.Control
                    value={password}
                    onChange={handlePasswordChange}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputGroup.Text>
                    {passwordShown ? (
                      <FiEyeOff type="button" onClick={togglePassword} />
                    ) : (
                      <FiEye type="button" onClick={togglePassword} />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPasswrod">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="mb-1">
                  <Form.Control
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    type={ConfirmpasswordShown ? "text" : "password"}
                    placeholder="Confirm Password"
                  />
                  <InputGroup.Text>
                    {ConfirmpasswordShown ? (
                      <FiEyeOff type="button" onClick={togglePassword1} />
                    ) : (
                      <FiEye type="button" onClick={togglePassword1} />
                    )}
                  </InputGroup.Text>
                </InputGroup>
                {confirmPassError && (
                  <Form.Text className="text-danger">
                    {confirmPassError}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="dark" type="submit">
                Register
              </Button>
            </Form>
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          <Card
            className="p-4 mx-auto text-center"
            style={{ maxWidth: "500px" }}
          >
            <span>
              Already have an account? <Link to="/">Login</Link>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
