import gql from 'graphql-tag';

export default gql`
  mutation AddUser(
    $id: ID!
    $name: String!
    $username: String!
    $email: String!
    $admin: Boolean!
    $eastgate: Boolean!
  ) {
    addUser(
      id: $id
      name: $name
      username: $username
      email: $email
      admin: $admin
      eastgate: $eastgate
    ) {
      id
      name
      username
      email
      admin
      eastgate
    }
  }
`;
