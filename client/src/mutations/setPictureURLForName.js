import gql from 'graphql-tag';

export default gql`
  mutation setPictureURLForName($id: ID, $name: String, $url: String) {
    setPictureURLForName(id: $id, name: $name, url: $url) {
      id
      name
      url
    }
  }
`;
