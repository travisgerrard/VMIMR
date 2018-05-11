const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLList,
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLError,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

require('../models/user');
require('../models/provider');
require('../models/rotation');
require('../models/condition');
require('../models/conditionLearning');
require('../models/eastgate');
require('../models/casePresentation');
require('../models/mutlipleChoiceQuestion');

const User = mongoose.model('users');
const Rotation = mongoose.model('Rotation');
const Provider = mongoose.model('Provider');
const Condition = mongoose.model('conditions');
const ConditionLearning = mongoose.model('conditionLearnings');
const Eastgate = mongoose.model('Eastgate');
const CasePresentation = mongoose.model('CasePresentation');
const MultipleChoiceQuestion = mongoose.model('MulitpleChoiceQuestion');

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
    dbname: {
      type: GraphQLString,
      description: 'what learning is stored as under given condition',
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
      type: ConditionType,
      description: 'The condition that this learning is associated with',
    },
    _creator: {
      type: UserType,
      description: 'User who created this learning',
    },
  }),
});

var EastgateType = new GraphQLObjectType({
  name: 'eastgateType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for eastgateType',
    },
    sectionTitle: {
      type: GraphQLString,
      description: 'The title of a eastgate section',
    },
    sectionContent: {
      type: GraphQLString,
      description: 'Eastgate manual section content',
    },
    sectionIndex: {
      type: GraphQLFloat,
      description: 'Where this section fits into the manual',
    },
    _creator: {
      type: UserType,
      description: 'User who created this section of the manual',
    },
  }),
});

var CasePresentationType = new GraphQLObjectType({
  name: 'casePresentationType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for casePresentationType',
    },
    _presentor: {
      type: UserType,
      description: 'Presentor of this presentation',
    },
    title: {
      type: GraphQLString,
      description: 'the title of the presentation',
    },
    presentationDate: {
      type: GraphQLString,
      description: 'the date one which a presentation was given',
    },
    hpi: {
      type: GraphQLString,
      description: 'hpi',
    },
    ros: {
      type: GraphQLString,
      description: 'ros',
    },
    physicalExam: {
      type: GraphQLString,
      description: 'physicalExam',
    },
    wbc: {
      type: GraphQLString,
      description: 'wbc',
    },
    hgb: {
      type: GraphQLString,
      description: 'hgb',
    },
    plt: {
      type: GraphQLString,
      description: 'plt',
    },
    Na: {
      type: GraphQLString,
      description: 'Na',
    },
    K: {
      type: GraphQLString,
      description: 'K',
    },
    Cl: {
      type: GraphQLString,
      description: 'Cl',
    },
    HC02: {
      type: GraphQLString,
      description: 'HC02',
    },
    BUN: {
      type: GraphQLString,
      description: 'BUN',
    },
    Cr: {
      type: GraphQLString,
      description: 'Cr',
    },
    Glu: {
      type: GraphQLString,
      description: 'Glu',
    },
    AP: {
      type: GraphQLString,
      description: 'AP',
    },
    ALT: {
      type: GraphQLString,
      description: 'ALT',
    },
    AST: {
      type: GraphQLString,
      description: 'AST',
    },
    Tbili: {
      type: GraphQLString,
      description: 'Tbili',
    },
    summAssessment: {
      type: GraphQLString,
      description: 'summAssessment',
    },
    embedPresentationSting: {
      type: GraphQLString,
      description: 'embedPresentationSting',
    },
    slideTextForSearch: {
      type: GraphQLString,
      description: 'slideTextForSearch',
    },
    tags: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with case',
    },
    meds: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with case',
    },
    medSurgHx: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with case',
    },
    social: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with case',
    },
    ddx: {
      type: GraphQLList(GraphQLString),
      description: 'list of tags associated with case',
    },
    questions: {
      type: GraphQLList(MultipleChoiceQuestionType),
      description: 'list of quetsions associated with this case',
    },
  }),
});

var MultipleChoiceQuestionType = new GraphQLObjectType({
  name: 'multipleChoiceQuestionType',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'ID for multiple choice question',
    },
    title: {
      type: GraphQLString,
      description: 'Question stem',
    },
    options: {
      type: GraphQLList(GraphQLString),
      description: 'List of possible answers',
    },
    answers: {
      type: GraphQLList(GraphQLString),
      description: 'Answers to the multiple choice question',
    },
    _creator: {
      type: GraphQLID,
      description: 'User who created this question',
    },
    _case: {
      type: GraphQLID,
      description: 'the case that this question is associated with',
    },
  }),
});

var listOfAllCasePresentations = {
  type: GraphQLList(CasePresentationType),
  description: 'List of all the case presentations',
  resolve: (parentValues, args, req) => {
    return CasePresentation.find()
      .populate({
        path: 'questions',
        model: 'MulitpleChoiceQuestion',
      })
      .populate({ path: '_presentor', model: 'users' });
  },
};

var currentUser = {
  type: UserType,
  description: 'The Current User',
  resolve: (parentValues, args, req) => {
    return req.user;
  },
};

var listOfUsers = {
  type: GraphQLList(UserType),
  description: 'List of all the users',
  resolve: (parentValues, args, req) => {
    return User.find();
  },
};

var userWithId = {
  type: UserType,
  description: 'User with respeictive ID',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    return await User.findById(id);
  },
};

var listOfProviders = {
  type: GraphQLList(ProviderType),
  description: 'list of all providers',
  resolve: (parentValues, args, req) => {
    return Provider.find();
  },
};

var listOfEastgateManual = {
  type: GraphQLList(EastgateType),
  description: 'list of all eastgate stuff to create manual',
  resolve: (parentValues, args, req) => {
    return Eastgate.find().populate({ path: '_creator', model: 'users' });
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
    var conditions = Condition.find().populate({
      path: '_learnings',
      model: 'conditionLearnings',
      populate: {
        path: 'usersTagged',
        model: 'users',
      },
    });

    return conditions;
  },
};

var listOfPersonalLearning = {
  type: GraphQLList(ConditionLearningType),
  description:
    'List of learning which your created or in which you are tagged or which you liked',
  args: {
    id: { type: GraphQLID },
    searchTerm: { type: GraphQLString },
  },
  resolve: (parentValues, { id, searchTerm }, req) => {
    var learnings = ConditionLearning.find({
      $or: [
        {
          usersTagged: id,
        },
        { _creator: id },
      ],
    })
      .populate({ path: '_condition', model: 'conditions' })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' })
      .sort('-dateUpdated');
    return learnings;
  },
};

var listOfLearningWithTag = {
  type: GraphQLList(ConditionLearningType),
  description: 'Most recent learning regarding a rotation',
  args: {
    id: { type: GraphQLID },
    rotation: { type: GraphQLString },
  },
  resolve: (parentValues, { id, rotation }, req) => {
    var learnings = ConditionLearning.find({
      $or: [
        {
          usersTagged: id,
        },
        { _creator: id },
      ],
      tags: { $in: [rotation] },
    })
      .limit(3)
      .sort({
        dateUpdated: -1,
      })
      .populate({ path: '_condition', model: 'conditions' })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' });

    return learnings;
  },
};

var listOfAllLearning = {
  type: GraphQLList(ConditionLearningType),
  description: 'List of all learning',

  resolve: (parentValues, args, req) => {
    var learnings = ConditionLearning.find()
      .populate({
        path: '_condition',
        model: 'conditions',
      })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' })
      .sort('-dateUpdated');
    return learnings;
  },
};

var returnLearning = {
  type: ConditionLearningType,
  description: 'Info regarding specific learning',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    return await ConditionLearning.findById(id)
      .populate({
        path: '_condition',
        model: 'conditions',
      })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' });
  },
};

var RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    currentUser,
    listOfUsers,
    userWithId,
    listOfProviders,
    listOfRotations,
    returnRotation,
    listOfConditions,
    listOfPersonalLearning,
    listOfAllLearning,
    listOfLearningWithTag,
    returnLearning,
    listOfEastgateManual,
    listOfAllCasePresentations,
  }),
});

var runMutation = {
  type: GraphQLString,
  resolve: (parentValues, args, context) => {
    return 'GraphQL mutation OK';
  },
};

var addUser = {
  type: UserType,
  description: 'Add or modify a user',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    admin: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  async resolve(parentValues, { id, name, username, email, admin }) {
    if (id === '12345') {
      var newUser = new User({
        name,
        username,
        email,
        admin,
        creationTime: Date.now(),
      });

      await newUser.save(function(err) {
        if (err) {
          return next(err);
        }
      });

      return newUser;
    }

    return await User.findByIdAndUpdate(
      id,
      { name, username, email, admin },
      { new: true },
    );
  },
};

var addEastgateManualSection = {
  type: EastgateType,
  description: 'Adds a section to the eastgate manual',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    sectionTitle: { type: new GraphQLNonNull(GraphQLString) },
    sectionContent: { type: new GraphQLNonNull(GraphQLString) },
    sectionIndex: { type: new GraphQLNonNull(GraphQLFloat) },
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(
    parentValues,
    { id, sectionTitle, sectionContent, sectionIndex, _creator },
  ) {
    if (id === '12345') {
      var newEastgateContent = new Eastgate({
        sectionTitle,
        sectionContent,
        sectionIndex,
        _creator,
      });

      await newEastgateContent.save(function(err) {
        if (err) {
          return next(err);
        }
      });

      return newEastgateContent;
    }

    return await Eastgate.findByIdAndUpdate(
      id,
      { sectionTitle, sectionContent, sectionIndex },
      { new: true },
    );
  },
};

var deleteEastgateManualSection = {
  type: EastgateType,
  description: 'Delete eastgate content',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    return await Eastgate.findByIdAndRemove(id, function(err, offer) {
      if (err) {
        throw err;
      }
    });
  },
};

var addProvider = {
  type: ProviderType,
  description:
    'Creates or updates a provider. If provider is added it updates the rotation so it knows the provider is attached to it',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    associatedRotation: { type: new GraphQLNonNull(GraphQLID) },
    generalInfo: { type: GraphQLString },
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(
    parentValues,
    { id, name, associatedRotation, generalInfo, _creator },
  ) {
    if (id === '12345') {
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
    }

    return await Provider.findByIdAndUpdate(
      id,
      {
        name,
        generalInfo,
      },
      { new: true },
    );
  },
};

var deleteProvider = {
  type: ProviderType,
  description: 'Delete a provider',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    var providerToBeDeleted = await Provider.findById(id).populate({
      path: 'associatedRotation',
      model: 'Rotation',
    });

    var rotationAssociatedWithProvider = await Rotation.findById(
      providerToBeDeleted.associatedRotation.id,
    );

    rotationAssociatedWithProvider.providers.pull(id);
    await rotationAssociatedWithProvider.save();

    await Provider.findByIdAndRemove(id, function(err, offer) {
      if (err) {
        throw err;
      }
    });

    return providerToBeDeleted;
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

var addCasePresentation = {
  type: CasePresentationType,
  args: {
    _creator: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parentValues, { _creator }) {
    var newCasePresentation = new CasePresentation({
      _creator,
      title: 'No Title',
    });

    await newCasePresentation.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    return newCasePresentation;
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

var addLearning = {
  type: ConditionLearningType,
  args: {
    condition: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
    attending: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    userTags: { type: GraphQLList(GraphQLString) },
    wwl: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parentValues,
    { condition, tags, attending, date, userTags, wwl },
    req,
  ) {
    var conditionExists = await Condition.findOne({
      condition,
    });

    if (conditionExists == null) {
      conditionExists = new Condition({
        tags,
        condition,
        _creator: req.user.id,
        dateCreated: Date.now(),
      });
    }

    await conditionExists.save();

    // If there is a learning associated with new conditions, need to create and save it
    const conditionLearningNew = new ConditionLearning({
      tags,
      whatWasLearned: wwl,
      dateField: date,
      seenWith: attending,
      usersTagged: userTags,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
      _condition: conditionExists._id,
      _creator: req.user.id,
    })
      .populate({ path: '_condition', model: 'conditions' })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' });

    await conditionLearningNew.save();

    // now need to let the conditions know that the learning exists, and save it
    conditionExists._learnings.push(conditionLearningNew._id);
    await conditionExists.save();

    return conditionLearningNew;
  },
};

var deleteLearning = {
  type: ConditionLearningType,
  description: 'Delete specific learning',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parentValues, { id }, req) {
    var learningToBeDeleted = await ConditionLearning.findById(id).populate({
      path: '_condition',
      model: 'conditions',
    });

    var conditionAsociatedWithLearning = await Condition.findById(
      learningToBeDeleted._condition.id,
    );

    // If there is only one learning point asscoated with a given conditions, then we will delete the condtiion as well
    if (conditionAsociatedWithLearning._learnings.length === 1) {
      await Condition.findByIdAndRemove(
        learningToBeDeleted._condition.id,
        function(err, offer) {
          if (err) {
            throw err;
          }
        },
      );
    } else {
      // Just take the ID asscoated with a given learning out of the array
      conditionAsociatedWithLearning._learnings.pull(id);
      await conditionAsociatedWithLearning.save();
    }

    await ConditionLearning.findByIdAndRemove(id, function(err, offer) {
      if (err) {
        throw err;
      }
    });

    return learningToBeDeleted;
  },
};

var updateLearning = {
  type: ConditionLearningType,
  description: 'Update specific learning',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    condition: { type: new GraphQLNonNull(GraphQLString) },
    tags: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
    attending: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    userTags: { type: GraphQLList(GraphQLString) },
    wwl: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parentValues,
    { condition, tags, attending, date, userTags, wwl, id },
    req,
  ) {
    var learningToBeUpdated = await ConditionLearning.findById(id).populate({
      path: '_condition',
      model: 'conditions',
    });

    var conditionToModify = await Condition.findById(
      learningToBeUpdated._condition.id,
    );

    if (condition !== learningToBeUpdated._condition.condition) {
      if (conditionToModify._learnings.length === 1) {
        conditionToModify.condition = condition;
        await conditionToModify.save();
      } else {
        conditionToModify._learnings.pull(id);
        await conditionToModify.save();
        conditionToModify = new Condition({
          tags,
          condition,
          _creator: req.user.id,
          dateCreated: Date.now(),
        });
        conditionToModify._learnings.push(id);

        await conditionToModify.save();
      }
    }

    var learningToUpdate = await ConditionLearning.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          whatWasLearned: wwl,
          dateField: date,
          seenWith: attending,
          usersTagged: userTags,
          dateUpdated: Date.now(),
          _condition: conditionToModify._id,
        },
      },
      { new: true },
    )
      .populate({ path: '_condition', model: 'conditions' })
      .populate({ path: '_creator', model: 'users' })
      .populate({ path: 'usersTagged', model: 'users' });
    await learningToUpdate.save();

    return learningToUpdate;
  },
};

var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    runMutation,
    addUser,
    addProvider,
    deleteProvider,
    addRotation,
    updateRotation,
    addLearning,
    deleteLearning,
    updateLearning,
    addEastgateManualSection,
    deleteEastgateManualSection,
    addCasePresentation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
