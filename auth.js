var jwtSecret = 'my_jwt_secret'; //must be same key as in JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); //local passport file

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //username to be encoded in JWT
    expiresIn: '7d', //specifies token will expire in 7days
    algorithm: 'HS256' //algorithm usedto "sign"/encode values of JWT
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session : false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
