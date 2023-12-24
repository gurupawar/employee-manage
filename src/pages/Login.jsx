import React, { useState } from "react";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useUserAuth } from "../context/UserAuthContext";
import { emailValidation } from "../utils/Helper";

export const Login = () => {
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("123@Guru");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { logIn } = useUserAuth();

  const navigate = useNavigate();

  // Email Validation
  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);
    const err_msg = emailValidation(value);
    setEmailError(err_msg);
  }

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (email === "" || password === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
    } else {
      const firebaseMsg = await logIn(email, password);
      if (firebaseMsg) {
        setMessage({ error: true, msg: firebaseMsg });
      } else {
        navigate("/home");
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
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
              <div className="row">
                <div className="col-6">
                  <Button variant="dark" type="submit">
                    Login
                  </Button>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                  <Link to="forgotPassword" className="text-decoration-none">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              </div>
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
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
