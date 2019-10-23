import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/Carddeck';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../img/logo.png';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

export class MainView extends React.Component {

    constructor(props) {
        //call superclass constructor so React can initialise it
        super(props);

        //init state to empty object so can be destructured later
        this.state = {
            movies: [],
            user: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://myflixmovies.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    userInfo: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
    }

    getMovies(token) {
        axios.get('https://myflixmovies.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //assign result to state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        //if state not initialised this will throw on runtime
        //before data is initially loaded
        const { movies, user, userInfo } = this.state;

        console.log(movies);
        console.log(userInfo);

        //before movies loaded
        if (!movies) return <div className="main-view" />;

        //TODO nav routing
        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return <div className="card-deck-div"><div className="welcome-div"><h2>Welcome to MyFlix {user}!</h2></div>
                            <CardDeck className="card-deck">
                                {movies.map(m => <Row className="card-row"><Col><MovieCard key={m._id} movie={m} /></Col></Row>)
                                }</CardDeck></div>
                    }} />

                    <Route exact path="/register" render={() => <RegistrationView />} />

                    <Route exact path="/userprofile" render={() => <ProfileView movies={movies} />} />

                    <Route exact path="/editprofile" render={() => <UpdateProfile userInfo={userInfo} />} />

                    <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

                    <Route exact path="/genres/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    }} />

                    <Route exact path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    }} />

                </div>
            </Router>
        );
    }
}

