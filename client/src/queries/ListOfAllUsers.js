import gql from 'graphql-tag';

export default gql`
  query listOfAllUsers {
    listOfUsers {
      id
      name
      email
      admin
      visible
    }
  }
`;
