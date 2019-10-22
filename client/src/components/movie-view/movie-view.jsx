import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }



    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <Container className="movie-details">
                    <Row className="movie-details-row">
                        <Col className="title">
                            <h2>{movie.Title}</h2>
                        </Col>
                    </Row>
                    <Row className="movie-details-row">
                        <Col sm={5} className="poster-img">
                            <img className="movie-img" src={movie.ImagePath} />
                        </Col>
                        <Col sm={7}>
                            <Row className="movie-details-row">
                                <Col className="label">Description</Col>
                                <Col classname="value">{movie.Description}</Col>
                            </Row>
                            <Row className="movie-details-row">
                                <Col className="label">Genre</Col>
                                <Col classname="value">
                                    <Row>
                                        <Col>
                                            {movie.Genre.Name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link to={`/genres/${movie.Genre.Name}`}>
                                                <Button variant="link" className="genre-director-links">Genre info</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="movie-details-row">
                                <Col className="label">Director</Col>
                                <Col classname="value">
                                    <Row>{movie.Director.Name}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Link to={`/directors/${movie.Director.Name}`}>
                                                <Button variant="link" className="genre-director-links">Director info</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="movie-details-row">
                                <Col className="go-back-col">
                                    <Link to={`/`}><Button className="back-button">Go back to movie list</Button></Link></Col>
                            </Row>
                        </Col>
                    </Row>



                </Container >
                <p></p>
            </div >
        );
    }
}


MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.instanceOf(Date).isRequired,
            Death: PropTypes.instanceOf(Date)
        })
    }).isRequired,
};
