import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './mini-moviecard.scss';

export class MiniMovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card style={{ width: '10rem' }} className="mini-movie-card">
                <Card.Img className="minimoviecard-img" variant='top' src={movie.ImagePath} />
                <Card.Body>
                    <Card.Text>{movie.Title}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link" className="movie-link">View Movie</Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }
}

MiniMovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};