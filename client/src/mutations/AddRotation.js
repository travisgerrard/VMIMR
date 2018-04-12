import gql from 'graphql-tag';

export default gql`
  mutation AddRotation($title: String!, $_creator: ID!) {
    addRotation(title: $title, _creator: $_creator) {
      id
      title
    }
  }
`;
