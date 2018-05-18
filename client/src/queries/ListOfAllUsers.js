import gql from 'graphql-tag';

export default gql`
  {
    listOfUsers {
      id
      name
      email
      admin
      visible
    }
  }
`;
