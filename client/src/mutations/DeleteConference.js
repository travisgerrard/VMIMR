import gql from 'graphql-tag';

export default gql`
  mutation DeleteConference($id: ID) {
    deleteConference(id: $id) {
      id
    }
  }
`;
