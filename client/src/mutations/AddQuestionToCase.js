import gql from 'graphql-tag';

export default gql`
  mutation AddQuestionToCase(
    $_case: ID!
    $_creator: ID!
    $questionStem: String!
    $options: [String]!
    $answers: [String]!
  ) {
    addQuestionToCase(
      _case: $_case
      _creator: $_creator
      questionStem: $questionStem
      options: $options
      answers: $answers
    ) {
      id
      _case
      _creator
      questionStem
      options
      answers
    }
  }
`;
