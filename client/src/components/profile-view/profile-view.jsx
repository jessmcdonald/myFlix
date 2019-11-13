import React from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

import { MiniMovieCard } from "../mini-moviecard/mini-moviecard";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  _mount = false;

  constructor(props) {
    //call superclass constructor so React can initialise it
    super(props);

    //init state to empty object so can be destructured later
    this.state = {
      userData: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      favouriteMovies: null
    };
  }

  componentDidMount() {
    this._mount = true;
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.deleteFavouriteMovie(accessToken);
      this.getUser(accessToken);
    }
  }

  componentWillUnmount() {
    this._mount = false;
  }

  getUser(token) {
    let username = localStorage.getItem("user");
    axios
      .get(`https://myflixmovies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (this._mount) {
          this.setState({
            userData: response.data,
            username: response.data.Username,
            password: response.data.Password,
            email: response.data.Email,
            birthday: response.data.Birthday,
            favouriteMovies: response.data.Favourites
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteFavouriteMovie(movieId) {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflixmovies.herokuapp.com/users/${username}/Movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        alert("movie was removed from your favourites");
        window.open("/userprofile", "_self");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const {
      username,
      email,
      password,
      birthday,
      favouriteMovies,
      userData
    } = this.state;
    const favouriteMovieList = this.props.movies.filter(m =>
      this.state.favouriteMovies.includes(m._id)
    );
    const { movies } = this.props.movies;

    console.log(movies);
    console.log(userData);

    return (
      <div className="profile-view">
        <div className="profile-page">
          <Container className="profile-box">
            <Row>
              <Col>
                <div className="greeting">
                  <h3>Hello {username}, welcome to your MyFlix profile:</h3>
                </div>
                <Form>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>
                      Username:
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={username}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Password:
                      <Form.Control
                        type="password"
                        plaintext
                        readOnly
                        defaultValue="******"
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Email address:
                      <Form.Control
                        type="email"
                        plaintext
                        readOnly
                        defaultValue={email}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Birthday:
                      <Form.Control
                        type="string"
                        plaintext
                        readOnly
                        defaultValue={birthday && birthday.slice(0, 10)}
                      />
                    </Form.Label>
                  </Form.Group>
                  <Button className="edit-button" href="/editprofile">
                    Edit Profile
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="favourites-div">
                  <h5>Your favourite movies:</h5>
                  <div className="favourite-movies">
                    <CardDeck className="card-deck">
                      {favouriteMovieList.map(m => (
                        <div className="favourite-movie">
                          <MiniMovieCard key={m._id} movie={m} />
                          <Button
                            className="remove-favourite-button"
                            size="sm"
                            onClick={e => this.deleteFavouriteMovie(m._id)}
                          >
                            Remove from favourites
                          </Button>
                        </div>
                      ))}
                    </CardDeck>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
