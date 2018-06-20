import gql from 'graphql-tag';

export default gql`
  mutation DeleteQuestion($id: ID) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;
