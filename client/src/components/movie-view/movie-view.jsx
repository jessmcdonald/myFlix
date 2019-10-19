import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {
            backClick: null
        };
    }

    onBackClick = () => {
        this.setState({
            backClick: true
        });
    }

    render() {
        const { movie } = this.props;
        const { backClick } = this.state;

        if (!movie) return null;

        return (
            <div className="movie-view">
                {backClick
                    ? <MainView />
                    : <Container className="movie-details">
                        <Row className="movie-title">
                            <Col xs={4} className="label">
                                Title
                            </Col>
                            <Col className="value">
                                {movie.Title}
                            </Col>
                        </Row>
                        <Row className="movie-description">
                            <Col xs={4} className="label">Description</Col>
                            <Col className="value">{movie.Description}</Col>
                        </Row>
                        <Row className="movie-poster">
                            <Col xs={4} className="label">Movie Poster</Col>
                            <Col className="poster-img">
                                <img className="movie-img" src={movie.ImagePath} />
                            </Col>
                        </Row>
                        <Row className="movie-genre">
                            <Col xs={4} className="label">Genre</Col>
                            <Col className="value">{movie.Genre.Name}</Col>
                        </Row>
                        <Row className="movie-director">
                            <Col xs={4} className="label">Director</Col>
                            <Col className="value"><b>{movie.Director.Name}</b>
                                <p>{movie.Director.Bio}</p>
                            </Col>
                        </Row>
                        <Row className="go-back">
                            <Col xs={4} ></Col>
                            <Col><Button onClick={this.onBackClick} className="back-button">Go back to movie list</Button>
                            </Col>
                        </Row>
                    </Container>
                }
            </div>
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
