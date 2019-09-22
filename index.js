const express = require('express'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

//middleware function handling errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//storing movie data 'in-memory' for first test
let movies = [ {
  id: '0',
  title: 'The Royal Tenenbaums',
  description: 'Royal Tenenbaum and his wife Etheline had three children and then they separated. All three children are extraordinary -all geniuses. Virtually all memory of the brilliance of the young Tenenbaums was subsequently erased by two decades of betrayal, failure, and disaster. Most of this was generally considered to be their father\'s fault. The Royal Tenenbaums is the story of the family\'s sudden, unexpected reunion one recent winter.',
  genres: ['Comedy', 'Drama'],
  director: 'Wes Anderson',
  imgURL: '',
  featured: true
},
{
  id: '1',
  title: 'Lost in Translation',
  description: 'A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.',
  genres: 'Drama',
  director: 'Sofia Coppola',
  imgURL: '',
  featured: false
},
{
  id: '2',
  title: 'Her',
  description: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
  genres: ['Drama', 'Romance', 'Sci-Fi'],
  director: 'Spike Jonze',
  imgURL: '',
  featured: true
},
{
  id: '3',
  title: 'Three Billboards Outside Ebbing, Missouri ',
  description: 'A mother personally challenges the local authorities to solve her daughter\'s murder when they fail to catch the culprit.',
  genres: ['Crime', 'Drama'],
  director:'Martin McDonagh',
  imgURL: '',
  featured: true
},
{
  id: '4',
  title: 'Lady Bird',
  description: 'In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.',
  genres: ['Comedy', 'Drama'],
  director: 'Greta Gerwig',
  imgURL: '',
  featured: false
}]

//storing genre data 'in-memory' for first test
let genres = [ {
  name: 'Drama',
  description: 'Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues.'
},
{
  name: 'Comedy',
  description: 'A comedy film is a genre of film in which the main emphasis is on humour. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception).'
},
{
  name: 'Sci-Fi',
  description: 'Science Fiction film is a genre that incorporates hypothetical, science-based themes into the plot of the film. Often, this genre incorporates futuristic elements and technologies to explore social, political, and philosophical issues. The film itself is usually set in the future, either on earth or in space. Traditionally, a Science Fiction film will incorporate heroes, villains, unexplored locations, fantastical quests, and advanced technology.'
},
{
  name: 'Romance',
  description: 'Romance film can be defined as a genre wherein the plot revolves around the love between two protagonists. This genre usually has a theme that explores an issue within love, including but not limited to: love at first sight, forbidden love, love triangles, and sacrificial love. The tone of Romance film can vary greatly. Whether the end is happy or tragic, Romance film aims to evoke strong emotions in the audience.'
},
{
  name: 'Crime',
  description: 'Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'
}]

//storing director data 'in-memory' for first test
let directors = [ {
  name: 'Wes Anderson',
  bio: 'Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson\'s parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. He was educated at Westchester High School and then St. John\'s, a private prep school in Houston, Texas, which was later to prove an inspiration for the film Rushmore (1998). Anderson attended the University of Texas in Austin, where he majored in philosophy. It was there that he met Owen Wilson. They became friends and began making short films, some of which aired on a local cable-access station. One of their shorts was Bottle Rocket (1993), which starred Owen and his brother Luke Wilson. The short was screened at the Sundance Film Festival, where it was successfully received, so much so that they received funding to make a feature-length version. Bottle Rocket (1996) was not a commercial hit, but it gained a cult audience and high-profile fans, which included Martin Scorsese. Success followed with films such as Rushmore (1998), The Life Aquatic with Steve Zissou (2004), The Royal Tenenbaums (2001) and an animated feature, Fantastic Mr. Fox (2009). The latter two films earned Anderson Oscar nominations.',
  born: '1969',
  died: '-'
},
{
  name: 'Sofia Coppola',
  bio: 'Sofia Coppola was born on May 14, 1971 in New York City, New York, USA as Sofia Carmina Coppola. She is a director, known for Somewhere (2010), Lost in Translation (2003) and Marie Antoinette (2006). She has been married to Thomas Mars since August 27, 2011. They have two children. She was previously married to Spike Jonze.',
  born: '1971',
  died: '-'
},
{
  name: 'Spike Jonze',
  bio:'Spike Jonze made up one-third (along with Andy Jenkins and Mark Lewman) of the triumvirate of genius minds behind Dirt Magazine, the brother publication of the much lamented ground-breaking Sassy Magazine. These three uncommon characters were all editors for Grand Royal Magazine as well, under the direction of Mike D and Adam Horovitz and Adam Yauch before the sad demise of Grand Royal Records. Jonze was also responsible for directing the famous Beastie Boys: Sabotage (1994) short film as well as numerous other music videos for various artists.',
  born: '1969',
  died: '-'
},
{
  name: 'Martin McDonagh',
  bio: 'Martin McDonagh was born on March 26, 1970 in Camberwell, London, England. He is a writer and director, known for In Bruges (2008), Three Billboards Outside Ebbing, Missouri (2017) and Seven Psychopaths (2012).',
  born: '1970',
  died: '-'
},
{
  name: 'Greta Gerwig',
  bio: 'Greta Gerwig is an American actress, playwright, screenwriter, and director. She has collaborated with Noah Baumbach on several films, including Greenberg (2010), Frances Ha (2012), for which she earned a Golden Globe nomination, and Mistress America (2015). Gerwig made her solo directorial debut with the critically acclaimed comedy-drama film Lady Bird (2017), which she also wrote, and has also had starring roles in the films Damsels in Distress (2011), Jackie (2016), and 20th Century Women (2016). Greta Celeste Gerwig was born in Sacramento, California, to Christine Gerwig (née Sauer), a nurse, and Gordon Gerwig, a financial consultant and computer programmer. She has German, Irish, and English ancestry. Gerwig was raised as a Unitarian Universalist, but also attended an all-girls Catholic school. She has described herself as "an intense child". With an early interest in dance, she intended to get a degree in musical theatre in New York. She graduated from Barnard College in NY, where she studied English and philosophy, instead. Originally intending to become a playwright, after meeting young film director Joe Swanberg, she became the star of a series of intellectual low budget movies made by first-time filmmakers, a trend dubbed "mumblecore". In 2017, she wrote and directed the highly acclaimed, semi-autobiographical teen movie Lady Bird (2017), set in 2002-2003, and starring Saoirse Ronan, Laurie Metcalf, and Timothée Chalamet.',
  born: '1983',
  died: '-'
}]

//storing user data 'in-memory' for first test
let users = [ {
  name: 'Joseph Degarr',
  email: 'jdogs@gmail.com',
  password: '123456',
  dob: '05.10.1989',
  favourites: [],
  id: "0"
}]

//GET functions

app.get('/', function(req, res) {
  res.send('Welcome to myFlix movie API')
});


//Gets all movie data
app.get('/movies', function(req, res) {
  res.json(movies)
});


//Gets the data of a movie by title
app.get("/movies/:title", (req, res) => {
  res.json(movies.find( (movie) =>
    { return movie.title === req.params.title }))
});


//Gets the description of a genre by name
app.get("/genres/:name", (req, res) => {
  res.json(genres.find( (genre) =>
    { return genre.name === req.params.name }))
});


//Gets info about a director by name
app.get("/directors/:name", (req, res) => {
  res.json(directors.find( (director) =>
    { return director.name === req.params.name }))
});


//Adds data for new user to list of users
//body-parser middleware allows to read body of request with req.body
//uuid.v4() creates universally unique ID for new user objects
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});


//Updates password of a user by user ID

app.put("/users/:id/:password", (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    user.id[req.params.password] = req.params.password;
    res.status(201).send("Password of user ID: " + req.params.id + " was updated.");
  } else {
    res.status(404).send("User ID: " + req.params.id + " was not found.")
  }
});


//Adds movie to list of favourites by user ID

app.post("/users/:id/:favourites/:newfilm", (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    user.id[req.params.favourites] = req.params.newfilm;
    res.status(201).send(req.params.newfilm + " was added to your favourites list.");
  } else {
    res.status(404).send("User ID: " + req.params.id + " was not found.")
  }
});


//Deletes movie from list of favourites by user ID

app.delete("/users/:id/:favourites/:deletedfilm", (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    user.id[req.params.favourites] = req.params.deletedfilm;
    res.status(201).send(req.params.deletedfilm + " was deleted from your favourites list.");
  } else {
    res.status(404).send("User ID: " + req.params.id + " was not found.")
  }
});


//Deletes user from list using ID

app.delete("/users/:id", (req, res) => {
  let user = users.find((user) => {return user.id === req.params.id });

  if (user) {
    users.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("User " + req.params.id + " was deleted.")
  }
});



app.listen(8080);
