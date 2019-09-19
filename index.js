const express = require('express'),
      morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

//middleware function handling errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

let topMovies = [ {
  title: 'The Royal Tenenbaums',
  director: 'Wes Anderson'
},
{
  title: 'Lost in Translation',
  director: 'Sofia Coppola'
},
{
  title: 'Her',
  director: 'Spike Jonze'
},
{
  title: 'Birdman',
  director:'Alejandro G. Iñárritu'
},
{
  title: 'Lady Bird',
  director: 'Greta Gerwig'
},
{
  title: 'Moonlight',
  director: 'Barry Jenkins'
},
{
  title: 'Little Miss Sunshine',
  director: 'Valerie Faris'
},
{
  title: 'Three Billboards Outside Ebbing, Missouri',
  director: 'Martin McDonagh'
},
{
  title: 'Manchester by the Sea',
  director: 'Kenneth Lonergan'
},
{
  title: 'Get Him To The Greek',
  director: 'Nicholas Stoller'
}]

app.get('/', function(req, res) {
  res.send('Welcome to my movie API')
});

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.listen(8080);
