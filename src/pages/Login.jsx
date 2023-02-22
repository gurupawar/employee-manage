import React, { useState } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import EmpDataServices from "../services/emp.services";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "" || password === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
    } else {
      console.log("login called from emp.services");
      const firebaseMsg = await EmpDataServices.login(email, password);
      if (firebaseMsg) {
        setMessage({ error: true, msg: firebaseMsg });
      } else {
        navigate("/employees");
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <Card className="p-4 mt-5 mx-auto" style={{ maxWidth: "500px" }}>
            <Card.Title>Login</Card.Title>
            {message?.msg && (
              <Alert
                variant={message?.error ? "danger" : "sucess"}
                dismissible
                onClick={() => setMessage("")}
              >
                {message?.msg}
              </Alert>
            )}
            <Form className="text-start" onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
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
              <Button variant="dark" type="submit">
                Login
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
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
