import gql from 'graphql-tag';

export default gql`
  query pictureURL($name: String) {
    pictureURL(name: $name) {
      id
      url
    }
  }
`;
