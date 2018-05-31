import gql from 'graphql-tag';

export default gql`
  mutation SubmitSurvey(
    $valueOne: String!
    $valueTwo: String!
    $valueThree: String!
    $valueFour: String!
  ) {
    submitSurvey(
      valueOne: $valueOne
      valueTwo: $valueTwo
      valueThree: $valueThree
      valueFour: $valueFour
    ) {
      id
      _surveyTaker
    }
  }
`;
