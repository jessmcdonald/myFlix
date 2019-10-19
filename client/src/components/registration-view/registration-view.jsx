import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import logo from '../../../img/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LoginView } from '../login-view/login-view';
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [alreadyUser, setAlreadyUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('new user registered with username:', username, 'and password:', password);
        /* TODO send request to server to register new user info*/
    };

    const popover = (
        <Popover id="popover-registered">
            <Popover.Title as="h3">Thank you for registering!</Popover.Title>
            <Popover.Content>
                You can now login via the link below.
          </Popover.Content>
        </Popover>
    );

    //TODO nav routing
    //TODO client side form validation
    return (
        <div className="registration-view">
            {alreadyUser
                ? <LoginView />
                : <div className="registration-page">
                    <Container className="registration-box">
                        <Row>
                            <Col>
                                <p>Not yet a member? Register with MyFlix below:</p>
                                <Form>
                                    <Form.Group controlId="formGroupUsername">
                                        <Form.Label>
                                            Username:
                                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Password:
                                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Email address:
                                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Birthday:
                                    <Form.Control type="password" value={birthday} onChange={e => setBirthday(e.target.value)} />
                                        </Form.Label>
                                    </Form.Group>
                                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                        <Button variant="success" className="register-button" onClick={handleSubmit}>Register</Button>
                                    </OverlayTrigger>
                                </Form >
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <div className="login-div"><p>Already a member?</p>
                                    </div>
                                    <Button className="login-button" value={alreadyUser} onClick={e => setAlreadyUser(true)}>Login here</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div >
            }
        </div>
    );
}

