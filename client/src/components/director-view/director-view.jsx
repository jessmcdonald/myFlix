import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from "react-bootstrap/CardDeck";

import { MiniMovieCard } from '../mini-moviecard/mini-moviecard';

import './director-view.scss';

export class DirectorView extends React.Component {

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
        const { director } = this.props;

        if (!director) return null;

        return (
            <div className="director-view">
                <Container className="director-details">
                    <Row className="director-details-row">
                        <Col className="title">
                            <h2>{director.Name}</h2>
                        </Col>
                    </Row>
                    <Row className="director-details-row">
                        <Col className="director-details-col">
                            <b>Born: </b>{director.Birth.substring(0, 4)}
                        </Col>
                    </Row>
                    <Row className="director-details-row">
                        <Col className="director-details-col">
                            {director.Bio}
                        </Col>
                    </Row>
                    <Row className="director-details-row">
                        <Col className="director-details-col">
                            <Row className="director-details-row">
                                <Col className="director-details-col">
                                    <h6>Some movies by {director.Name}:</h6>
                                </Col>
                            </Row>

                            <Row className="director-details-row">
                                <CardDeck className="card-deck">
                                    {movies.map(m => {
                                        if (m.Director.Name === director.Name) {
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

