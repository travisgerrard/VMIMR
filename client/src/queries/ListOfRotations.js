import gql from 'graphql-tag';

export default gql`
  query listOfRotations {
    listOfRotations {
      id
      title
    }
  }
`;
