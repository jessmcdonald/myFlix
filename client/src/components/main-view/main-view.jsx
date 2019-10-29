import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';

import './main-view.scss';

class MainView extends React.Component {

    constructor(props) {
        //call superclass constructor so React can initialise it
        super(props);

        //init state to empty object so can be destructured later
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        let userInfo = localStorage.getItem('userInfo');
        if (accessToken !== null) {
            this.props.setUser(userInfo);
        }
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        this.getUser(accessToken);
    }


    getMovies(token) {
        axios.get('https://myflixmovies.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://myflixmovies.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
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

    render() {
        //if state not initialised this will throw on runtime
        //before data is initially loaded
        const { movies, userInfo } = this.props;
        let user = this.state;

        console.log(movies);
        console.log(userInfo);

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route exact path="/register" render={() => <RegistrationView />} />

                    <Route exact path="/userprofile" render={() => <ProfileView movies={movies} userInfo={userInfo} />} />

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
            </Router >
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

