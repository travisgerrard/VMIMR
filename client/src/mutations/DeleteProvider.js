import gql from 'graphql-tag';

export default gql`
  mutation DeleteProvider($id: ID) {
    deleteProvider(id: $id) {
      id
    }
  }
`;
