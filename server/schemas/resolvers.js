const { User, Thought } = require("../models");

// Now when we query thoughts, we will perform a .find() method on the Thought model. We're also returning the thought data in descending order, as can be seen in the .sort() method that we chained onto it.
// Here, we pass in the parent as more of a placeholder parameter. It won't be used, but we need something in that first parameter's spot so we can access the username argument from the second parameter. We use a ternary operator to check if username exists. If it does, we set params to an object with a username key set to that value. If it doesn't, we simply return an empty object.
const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;