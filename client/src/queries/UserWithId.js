import gql from 'graphql-tag';

export default gql`
  query UserWithId($id: ID) {
    userWithId(id: $id) {
      id
      name
      username
      email
      admin
      eastgate
      visible
    }
  }
`;
