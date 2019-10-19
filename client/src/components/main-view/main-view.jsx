import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/Carddeck';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../img/logo.png';
import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        //call superclass constructor so React can initialise it
        super();

        //init state to empty object so can be destructured later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: null
        };
    }

    componentDidMount() {
        axios.get('https://myflixmovies.herokuapp.com/movies')
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

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        //if state not initialised this will throw on runtime
        //before data is initially loaded
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        //before movies loaded
        if (!movies) return <div className="main-view" />;

        //TODO nav routing
        return (
            <div className="main-view">
                <div className="card-deck-div">
                    <CardDeck className="card-deck">
                        {selectedMovie
                            ? <MovieView movie={selectedMovie} />
                            : movies.map(movie => (
                                <Row className="card-row"><Col><MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} /></Col></Row>
                            ))
                        }
                    </CardDeck>
                </div >
            </div>
        );
    }
}