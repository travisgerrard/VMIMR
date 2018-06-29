import gql from 'graphql-tag';

export default gql`
  mutation AddCasePresentation(
    $id: ID!
    $presentationDate: String!
    $_presentor: ID!
  ) {
    addCasePresentation(
      _creator: $id
      presentationDate: $presentationDate
      _presentor: $_presentor
    ) {
      id
      presentationDate
    }
  }
`;
