import gql from 'graphql-tag';

export default gql`
  mutation SubmitSurvey(
    $valueOne: String!
    $valueTwo: String!
    $valueThree: String!
    $valueFour: String!
    $id: ID!
  ) {
    submitSurvey(
      valueOne: $valueOne
      valueTwo: $valueTwo
      valueThree: $valueThree
      valueFour: $valueFour
      id: $id
    ) {
      id
      _surveyTaker
    }
  }
`;
