const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

// The signToken() function expects a user object and will add that user's username, email, and _id properties to the token. Optionally, tokens can be given an expiration date and a secret to sign the token with. Note that the secret has nothing to do with encoding. The secret merely enables the server to verify whether it recognizes this token. The JWT website knows which JSON data was stored on the token string because the encoding algorithm is universal. That's why you should never include sensitive data like a password on your tokens—and always sign your tokens with a secret. You don't want your server to accept a token from just anyone!
module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
