import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import CardDeck from "react-bootstrap/CardDeck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './movies-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => {
            let title = m.Title.toLowerCase()
            return title.includes(visibilityFilter.toLowerCase())
        });
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
        <div className="search-bar">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </div>
        <div className="card-deck-container">
            <CardDeck className="card-deck">
                {filteredMovies.map(m => <Row key={m._id} className="card-row"><Col><MovieCard key={m._id} movie={m} /></Col></Row>)}
            </CardDeck>

        </div>
    </div>
        ;
}

export default connect(mapStateToProps)(MoviesList);


