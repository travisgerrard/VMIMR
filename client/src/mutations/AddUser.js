import gql from 'graphql-tag';

export default gql`
  mutation AddUser(
    $id: ID!
    $name: String!
    $username: String!
    $email: String!
    $admin: Boolean!
  ) {
    addUser(
      id: $id
      name: $name
      username: $username
      email: $email
      admin: $admin
    ) {
      id
      name
      username
      email
      admin
    }
  }
`;
