import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from "react-bootstrap/CardDeck";

import { MiniMovieCard } from '../mini-moviecard/mini-moviecard';

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: []
        };
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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    render() {
        const { movies } = this.state;
        const { genre } = this.props;

        if (!genre) return null;

        return (
            <div className="genre-view">
                <Container className="genre-details">
                    <Row className="genre-details-row">
                        <Col className="title">
                            <h2>{genre.Name}</h2>
                        </Col>
                    </Row>
                    <Row className="genre-details-row">
                        <Col className="genre-details-col">
                            {genre.Description}
                        </Col>
                    </Row>
                    <Row className="director-details-row">
                        <Col className="director-details-col">
                            <Row className="director-details-row">
                                <Col className="director-details-col">
                                    <h6>Some {genre.Name} movies:</h6>
                                </Col>
                            </Row>

                            <Row className="genre-details-row">
                                <CardDeck className="card-deck">
                                    {movies.map(m => {
                                        if (m.Genre.Name === genre.Name) {
                                            return (
                                                <Row className="card-row"><Col><MiniMovieCard key={m._id} movie={m} /></Col></Row>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </CardDeck>
                            </Row>
                        </Col>
                    </Row>
                </Container >
            </div >
        );
    }
}

