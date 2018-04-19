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
      whatWasLearned
      tags
      usersTagged {
        id
        name
      }
      dateField
      seenWith
      dateCreated
      dateUpdated
      dotPhrase
      _condition {
        id
        condition
        tags
        _creator
      }
      _creator {
        id
        name
      }
    }
  }
`;
