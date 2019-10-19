import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../../img/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';

import { RegistrationView } from '../registration-view/registration-view';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newUser, setNewUser] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* TODO send request to server for authentification*/
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    //TODO nav routing
    //TODO form validation
    return (
        <div className="login-view">
            {newUser
                ? <RegistrationView />
                : <div className="login-page">
                    <Container className="login-box">
                        <Row>
                            <Col>
                                <p>Already a member? Login below:</p>
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
                                    <Button className="login-button" onClick={handleSubmit}>Submit</Button>
                                </Form >
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <div className="register-div"><p>Not yet a member?</p>
                                    </div>
                                    <Button className="register-button" value={newUser} onClick={e => setNewUser(true)}>Register here</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div >
            }
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};