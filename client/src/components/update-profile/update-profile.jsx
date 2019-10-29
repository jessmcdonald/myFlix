import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './update-profile.scss';

export function UpdateProfile(props) {
    const { userInfo } = props;

    if (!userInfo) {
        return null;
    }

    console.log(userInfo);

    const [username, updateUsername] = useState(userInfo.Username);
    const [password, updatePassword] = useState(userInfo.Password);
    const [email, updateEmail] = useState(userInfo.Email);
    const [birthday, updateBirthday] = useState(userInfo.Birthday);

    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://myflixmovies.herokuapp.com/users/${user}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const data = response.data;
                alert('Your information has been updated');
                console.log(data);
                window.open('/userprofile', '_self');
            })
            .catch(e => {
                console.log('error updating user info')
            });
    };

    const handleDeregister = (e) => {
        e.preventDefault();

        axios.delete(`https://myflixmovies.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert('Your account has been deleted');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open('/', '_self');
                this.setState({
                    user: null
                });
            })
            .catch(function (error) {
                console.log(error);
                alert('Could not delete user info')
            });
    }

    return (
        <div className="profile-view" >
            <div className="profile-page">
                <Container className="profile-box">
                    <Row>
                        <Col>
                            <div className="greeting">
                                <h3>Hello {user}, you can edit your info below:</h3>
                            </div>
                            <Form>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Label>
                                        Username:
                                    <Form.Control plaintext readOnly defaultValue={user} />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Password:
                                    <Form.Control type="password" value={password} onChange={e => updatePassword(e.target.value)} />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Email address:
                                    <Form.Control type="email" value={email} onChange={e => updateEmail(e.target.value)} />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Birthday:
                                    <Form.Control type="date" value={birthday} onChange={e => updateBirthday(e.target.value)} />
                                    </Form.Label>
                                </Form.Group>
                                <Button className="edit-button" onClick={handleUpdate} >Save changes</Button>
                            </Form >
                            <div className="deregister-div">
                                <h6>If you really want to leave us..</h6>
                                <p className="deregister-div-warning">Warning: this is irreversible, all account information including your saved movies will be deleted.</p>
                            </div>
                            <div className="deregister-button-div">
                                <Button className="deregister-button" variant="danger" onClick={handleDeregister}>Delete account</Button>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div >
        </div>
    );
}



