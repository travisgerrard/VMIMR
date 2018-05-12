import gql from 'graphql-tag';

export default gql`
  query SelectedCasePresentation($id: ID) {
    selectedCasePresentation(id: $id) {
      id
      title
      _presentor {
        id
        name
      }
      presentationDate
      hpi
      ros
      physicalExam
      wbc
      hgb
      plt
      Na
      K
      Cl
      HC02
      BUN
      Cr
      Glu
      AP
      ALT
      AST
      Tbili
      summAssessment
      embedPresentationSting
      slideTextForSearch
      tags
      meds
      medSurgHx
      social
      ddx
      questions {
        id
        title
        options
        answers
      }
    }
  }
`;
