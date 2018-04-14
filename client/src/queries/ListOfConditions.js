import gql from 'graphql-tag';

export default gql`
  {
    listOfConditions {
      id
      condition
      tags
      _learnings {
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
        _creator
      }
      dateCreated
      dateUpdated
      _creator
    }
  }
`;
