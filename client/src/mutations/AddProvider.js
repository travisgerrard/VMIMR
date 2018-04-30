import gql from 'graphql-tag';

export default gql`
  mutation AddProvider(
    $id: ID!
    $name: String!
    $associatedRotation: ID!
    $generalInfo: String
    $_creator: ID!
  ) {
    addProvider(
      id: $id
      name: $name
      associatedRotation: $associatedRotation
      generalInfo: $generalInfo
      _creator: $_creator
    ) {
      id
      name
      generalInfo
    }
  }
`;
