import gql from 'graphql-tag';

export default gql`
  {
    listOfAllLearning {
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
