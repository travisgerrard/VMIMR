import gql from 'graphql-tag';

export default gql`
  mutation UpdateRotationGeneralInfo($id: ID, $generalInfo: String) {
    updateRotation(id: $id, generalInfo: $generalInfo) {
      id
    }
  }
`;
