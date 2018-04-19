import gql from 'graphql-tag';

export default gql`
  mutation DeleteLearning($id: ID) {
    deleteLearning(id: $id) {
      id
      whatWasLearned
      _condition {
        id
      }
    }
  }
`;
