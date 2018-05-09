import gql from 'graphql-tag';

export default gql`
  query ReturnRotation($id: ID) {
    returnRotation(id: $id) {
      id
      title
      generalInfo
      dbname
      providers {
        id
        name
        generalInfo
      }
    }
  }
`;
