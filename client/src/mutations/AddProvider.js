import gql from 'graphql-tag';

export default gql`
  mutation AddProvider(
    $name: String!
    $associatedRotation: ID!
    $generalInfo: String
    $_creator: ID!
  ) {
    addProvider(
      name: $name
      associatedRotation: $associatedRotation
      generalInfo: $generalInfo
      _creator: $_creator
    ) {
      id
    }
  }
`;
