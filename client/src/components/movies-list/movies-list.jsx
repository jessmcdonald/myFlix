import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        <CardDeck className="card-deck">
            {filteredMovies.map(m => <Row className="card-row"><Col><MovieCard key={m._id} movie={m} /></Col></Row>)}
        </CardDeck>
    </div>
        ;
}

export default connect(mapStateToProps)(MoviesList);


