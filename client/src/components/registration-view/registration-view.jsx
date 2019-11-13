import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const urlProxy =
      "https://cors-anywhere.herokuapp.com/https://myflixmovies.herokuapp.com/users";
    axios({
      method: "POST",
      url: urlProxy,
      data: {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const popover = (
    <Popover id="popover-registered">
      <Popover.Title as="h3">Thank you for registering!</Popover.Title>
      <Popover.Content>You can now login.</Popover.Content>
    </Popover>
  );

  //TODO client side form validation
  return (
    <div className="registration-view">
      <div className="registration-page">
        <Container className="registration-box">
          <Row>
            <Col>
              <p>Not yet a member? Register with MyFlix below:</p>
              <Form>
                <Form.Group controlId="formGroupUsername">
                  <Form.Label>
                    Username:
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Password:
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Email address:
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Birthday:
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Label>
                </Form.Group>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <Button className="register-button" onClick={handleSubmit}>
                    Register
                  </Button>
                </OverlayTrigger>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <div className="login-div">
                  <p>Already a member?</p>
                </div>
                <Link to={`/`}>
                  <Button className="login-button">Login here</Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
