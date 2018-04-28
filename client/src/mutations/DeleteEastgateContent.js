import gql from 'graphql-tag';

export default gql`
  mutation DeleteEastgateContent($id: ID) {
    deleteEastgateManualSection(id: $id) {
      id
    }
  }
`;
