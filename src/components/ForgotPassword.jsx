import React, { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { emailValidation } from "../utils/Helper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [msg, setMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const { forgotPassword } = useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const err_msg = emailValidation(e.target.value);
    console.log(err_msg);
    setEmailError(err_msg);
  };
  const handleChangePasswrod = async (e) => {
    setMsg("");
    e.preventDefault();
    console.log("clicked");
    const msg = await forgotPassword(email);
    setMsg(msg.message);
    setErrCode(msg.code);
  };
  return (
    <div className="container py-4">
      <div className="col-md-6 col-12  mx-auto">
        <div className="card border-0 shadow  mx-auto p-4 text-start">
          <Card.Title className="mb-4">Change Password</Card.Title>
          <form onSubmit={handleChangePasswrod}>
            {msg && (
              <div
                className={
                  errCode === "auth/user-not-found" || "auth/too-many-requests"
                    ? "alert alert-danger"
                    : "alert alert-success"
                }
                role="alert"
              >
                {msg}
              </div>
            )}
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
            <Button variant="primary" type="submit">
              Change
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
