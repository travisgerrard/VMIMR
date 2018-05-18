import gql from 'graphql-tag';

export default gql`
  {
    listOfUsersThatAreVisible {
      id
      name
      email
      admin
      visible
    }
  }
`;
