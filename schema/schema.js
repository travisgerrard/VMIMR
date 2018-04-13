const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLError,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

require('../models/user');
require('../models/provider');
require('../models/rotation');
const User = mongoose.model('users');
const Provider = mongoose.model('Provider');
const Rotation = mongoose.model('Rotation');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

var UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for given user',
    },
    name: {
      type: GraphQLString,
      description: 'The user name',
    },
    username: {
      type: GraphQLString,
      description: 'Cerner login',
    },
    email: {
      type: GraphQLString,
      description: 'VM Email address',
    },
    phoneNumber: {
      type: GraphQLString,
      description: 'User Phone number',
    },
    pushToken: {
      type: GraphQLString,
      description: 'token to identify user for push notifications....',
    },
    creationTime: {
      type: GraphQLString,
      description: 'When user was created...',
    },
    lastSignInTime: {
      type: GraphQLString,
      description: 'Date of last signin',
    },
    admin: {
      type: GraphQLBoolean,
      description: 'Is user an admin?',
    },
  }),
});

var currentUser = {
  type: UserType,
  description: 'The Current User',
  resolve: (parentValues, args, req) => {
    return req.user;
  },
};

var ProviderType = new GraphQLObjectType({
  name: 'providerType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for provider',
    },
    name: {
      type: GraphQLString,
      description: 'The provider name',
    },
    associatedRotation: {
      type: GraphQLID,
      description: 'ID of rotation that provider was created from',
    },
    _creator: {
      type: GraphQLID,
      description: 'The id for the user who created the provider',
    },
  }),
});

var RotationType = new GraphQLObjectType({
  name: 'rotationType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for rotation',
    },
    title: {
      type: GraphQLString,
      description: 'Rotation title',
    },
    generalInfo: {
      type: GraphQLString,
      description: 'Genral info regarding a rotation',
    },
    providers: {
      type: GraphQLList(ProviderType),
      description: 'List of providers associated with rotation',
    },
    _creator: {
      type: GraphQLID,
      description: 'Creator of this rotation',
    },
  }),
});

var listOfUsers = {
  type: GraphQLList(UserType),
  description: 'List of all the users',
  resolve: (parentValues, args, req) => {
    return User.find();
  },
};

var listOfProviders = {
  type: GraphQLList(ProviderType),
  description: 'list of all providers',
  resolve: (parentValues, args, req) => {
    return Provider.find();
  },
};

var returnRotation = {
  type: RotationType,
  description: 'Info regarding specific rotation',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    return await Rotation.findById(id).populate('providers');
  },
};

var listOfRotations = {
  type: GraphQLList(RotationType),
  description: 'List of all rotations',
  resolve: (parentValues, args, req) => {
    return Rotation.find();
  },
};

var RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    currentUser,
    listOfUsers,
    listOfProviders,
    listOfRotations,
    returnRotation,
  }),
});

var runMutation = {
  type: GraphQLString,
  resolve: (parentValues, args, context) => {
    return 'GraphQL mutation OK';
  },
};

var addProvider = {
  type: ProviderType,
  description:
    'Creates a providers and updates the rotation so it knows the provider is attached to it',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    associatedRotation: { type: new GraphQLNonNull(GraphQLID) },
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parentValues, { name, associatedRotation, _creator }) {
    var newProvider = new Provider({ name, associatedRotation, _creator });

    await newProvider.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    await Rotation.findByIdAndUpdate(
      associatedRotation,
      { $push: { providers: newProvider._id } },
      { new: true },
    );

    return newProvider;
  },
};

var addRotation = {
  type: RotationType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parentValues, { title, _creator }) {
    var newRotation = new Rotation({ title, _creator });

    await newRotation.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    return newRotation;
  },
};

var updateRotation = {
  type: RotationType,
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    generalInfo: { type: GraphQLString },
  },
  async resolve(parentValues, args) {
    var { id } = args;

    return await Rotation.findByIdAndUpdate(id, args, { new: true });
  },
};

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    runMutation,
    addProvider,
    addRotation,
    updateRotation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
