const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

// The signToken() function expects a user object and will add that user's username, email, and _id properties to the token. Optionally, tokens can be given an expiration date and a secret to sign the token with. Note that the secret has nothing to do with encoding. The secret merely enables the server to verify whether it recognizes this token. The JWT website knows which JSON data was stored on the token string because the encoding algorithm is universal. That's why you should never include sensitive data like a password on your tokens—and always sign your tokens with a secret. You don't want your server to accept a token from just anyone!
module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    // We don't want an error thrown on every request. Users with an invalid token should still be able to request and see all thoughts. Thus, we wrapped the verify() method in a try...catch statement to mute the error. We'll manually throw an authentication error on the resolver side when the need arises.
    try {
      // decode and attach user data to request object
      // This is where the secret becomes important. If the secret on jwt.verify() doesn't match the secret that was used with jwt.sign(), the object won't be decoded. When the JWT verification fails, an error is thrown.
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return updated request object
    return req;
  },
};
