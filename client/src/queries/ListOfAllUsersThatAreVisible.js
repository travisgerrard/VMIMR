import gql from 'graphql-tag';

export default gql`
  query listOfUsersThatAreVisible {
    listOfUsersThatAreVisible {
      id
      name
      email
      admin
      visible
    }
  }
`;
