const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLError,
} = graphql;

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

//const RootQueryType = require('./types/root_query_type');

// Userful site for getting authToken into GraphQL
// https://blog.cloudboost.io/graphql-users-authorization-with-json-web-tokens-on-express-graphql-86d3dbf413df

var runQuery = {
  type: GraphQLString,
  description: 'Test Value.',
  resolve: (parentValues, args, req) => {
    return req.user.name;
  },
};

var RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    runQuery,
  }),
});

var runMutation = {
  type: GraphQLString,
  resolve: (parentValues, args, context) => {
    return 'GraphQL mutation OK';
  },
};

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    runMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
