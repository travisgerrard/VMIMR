import gql from 'graphql-tag';

export default gql`
  mutation AddEastgateSection(
    $sectionTitle: String!
    $sectionContent: String!
    $_creator: ID!
    $sectionIndex: Float!
  ) {
    addEastgateManualSection(
      sectionTitle: $sectionTitle
      sectionContent: $sectionContent
      sectionIndex: $sectionIndex
      _creator: $_creator
    ) {
      id
      sectionTitle
      sectionContent
      sectionIndex
    }
  }
`;
