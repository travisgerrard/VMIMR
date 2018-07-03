import gql from 'graphql-tag';

export default gql`
  mutation AddQuestionToCase(
    $_case: ID!
    $_creator: ID!
    $questionId: ID!
    $questionStem: String!
    $questionAnswerText: String!
    $options: [String]!
    $answers: [String]!
  ) {
    addQuestionToCase(
      _case: $_case
      _creator: $_creator
      questionId: $questionId
      questionStem: $questionStem
      questionAnswerText: $questionAnswerText
      options: $options
      answers: $answers
    ) {
      id
      _case
      _creator
      questionStem
      questionAnswerText
      options
      answers
    }
  }
`;
