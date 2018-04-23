import gql from 'graphql-tag';

export default gql`
  query ListOfEastgateContent {
    listOfEastgateManual {
      id
      sectionTitle
      sectionContent
      sectionIndex
    }
  }
`;
