import gql from 'graphql-tag';

export default gql`
  mutation AddLearning(
    $condition: String!
    $tags: [String]!
    $attending: String!
    $date: String!
    $userTags: [String]!
    $wwl: String!
  ) {
    addLearning(
      condition: $condition
      tags: $tags
      attending: $attending
      date: $date
      userTags: $userTags
      wwl: $wwl
    ) {
      id
    }
  }
`;
