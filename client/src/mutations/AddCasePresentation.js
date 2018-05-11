import gql from 'graphql-tag';

export default gql`
  mutation AddCasePresentation($id: ID!) {
    addCasePresentation(_creator: $id) {
      id
    }
  }
`;
