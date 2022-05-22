// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs. You can define your different types of queries by naming them, just as you would name a function in JavaScript. In our case, we created a query named helloWorld. Not only that, we also explicitly specified that the type of data to be returned by this query will be a string.
// With this custom data type, we are able to instruct the thoughts query so that each thought that returns can include _id, thoughtText, username, and reactionCount fields with their respective GraphQL scalars. The new ones here, ID and Int, are indeed new to us. ID is essentially the same as String except that it is looking for a unique identifier; and Int is simply an integer.
// Notice the exclamation point ! after the query parameter data type definitions? That indicates that for that query to be carried out, that data must exist. Otherwise, Apollo will return an error to the client making the request and the query won't even reach the resolver function associated with it.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

// export the typeDefs
module.exports = typeDefs;
