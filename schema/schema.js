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
require('../models/condition');
require('../models/conditionLearning');

const User = mongoose.model('users');
const Provider = mongoose.model('Provider');
const Rotation = mongoose.model('Rotation');
const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');

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
    generalInfo: {
      type: GraphQLString,
      description: 'General info about provider',
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

var ConditionType = new GraphQLObjectType({
  name: 'conditionType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for condition',
    },
    condition: {
      type: GraphQLString,
      description: 'Title of condition',
    },
    tags: {
      type: GraphQLList(GraphQLString),
      description: 'Rotations linked to a condition',
    },
    _learnings: {
      type: GraphQLList(ConditionLearningType),
      description: 'A conditions associated learning',
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Date condition created',
    },
    dateUpdated: {
      type: GraphQLString,
      description: 'Date that condition was last updated',
    },
    _creator: {
      type: GraphQLID,
      description: 'Creator of this condition',
    },
  }),
});

var ConditionLearningType = new GraphQLObjectType({
  name: 'conditionLearningType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for conditionLearning',
    },
    whatWasLearned: {
      type: GraphQLString,
      description: 'The markdown text of what was learned',
    },
    tags: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with learning',
    },
    usersTagged: {
      type: GraphQLList(UserType),
      description: 'Users tagged in learning',
    },
    dateField: {
      type: GraphQLString,
      description: 'User entered date for info',
    },
    seenWith: {
      type: GraphQLString,
      description:
        'User entered field for attending that learning is associated with',
    },
    dateCreated: {
      type: GraphQLString,
      description: 'Computer gen date, when created',
    },
    dateUpdated: {
      type: GraphQLString,
      description: 'Computer gen date, when mst recently updated',
    },
    dotPhrase: {
      type: GraphQLBoolean,
      description:
        'Aspiration field to determine if learning should be used as a dot phrase',
    },
    _condition: {
      type: GraphQLID,
      description: 'The condition that this learning is associated with',
    },
    _creator: {
      type: GraphQLID,
      description: 'User who created this condition',
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

var listOfConditions = {
  type: GraphQLList(ConditionType),
  description: 'List of all conditions',
  resolve: (parentValues, args, req) => {
    return Condition.find().populate({
      path: '_learnings',
      model: 'conditionLearnings',
      populate: {
        path: 'usersTagged',
        model: 'users',
      },
    });
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
    listOfConditions,
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
    generalInfo: { type: GraphQLString },
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(
    parentValues,
    { name, associatedRotation, generalInfo, _creator },
  ) {
    var newProvider = new Provider({
      name,
      associatedRotation,
      generalInfo,
      _creator,
    });

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
