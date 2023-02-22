import React, { useState } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import EmpDataServices from "../services/emp.services";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [ConfirmpasswordShown, setConfirmPasswordShown] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "" || password === "" || confirmPassword === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
    } else {
      if (password === confirmPassword) {
        console.log("register called from emp.services");
        const firebaseMsg = await EmpDataServices.register(email, password);
        if (firebaseMsg) {
          setMessage({ error: true, msg: firebaseMsg });
        } else {
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswrod">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPasswrod">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
