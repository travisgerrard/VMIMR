const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLID} = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {type: GraphQLID},
    email: {type: GraphQLString}
  })
});

module.exports = UserType;