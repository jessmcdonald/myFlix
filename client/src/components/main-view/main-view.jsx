import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        //call superclass constructor so React can initialise it
        super();

        //init state to empty object so can be destructured later
        this.state = {
            movies: null,
            selectedMovie: null
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

    render() {
        //if state not initialised this will throw on runtime
        //before data is initially loaded
        const { movies, selectedMovie } = this.state;

        //before movies loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}