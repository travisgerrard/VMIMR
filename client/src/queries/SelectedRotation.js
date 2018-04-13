import gql from 'graphql-tag';

export default gql`
  query ReturnRotation($id: ID) {
    returnRotation(id: $id) {
      id
      title
      generalInfo
      providers {
        id
        name
        generalInfo
      }
    }
  }
`;
