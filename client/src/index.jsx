import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Container from 'react-bootstrap/Container';
import logo from '../img/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

//import statement to indicate that `index.scss` needs to be bundled
import './index.scss';

const store = createStore(moviesApp);

//main component
class MyFlixApplication extends React.Component {

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
    }


    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <Navbar className="navbar" expand="lg" sticky="top">
                        <Container>
                            < Navbar.Brand href="#home">
                                <img
                                    alt=""
                                    src={logo}
                                    height="60"
                                    className="d-inline-block align-top"
                                />{' '}
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/" className="navlink">Home</Nav.Link>
                                    <Nav.Link href="/" className="navlink">Movies</Nav.Link>
                                    <Nav.Link href="#home" eventKey="disabled" className="navlink">Directors</Nav.Link>
                                    <Nav.Link href="#home" eventKey="disabled" className="navlink">Genres</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <NavDropdown title="MyFlix Account" id="basic-nav-dropdown" className="nav-dropdown">
                                        <NavDropdown.Item href="/userprofile" className="navlink">My Movies</NavDropdown.Item>
                                        <NavDropdown.Item href="/userprofile" className="navlink">Account settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/" className="navlink" onClick={() => this.onLoggedOut()}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <MainView />
                </div >
            </Provider>
        );
    }
}

//find root of app
const container = document.getElementsByClassName('app-container')[0];

//render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

