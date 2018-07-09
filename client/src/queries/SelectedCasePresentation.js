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
      presentationType
      hpi
      ros
      pmh
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
      imaging
      additionalLabs
      embedPresentationSting
      slideTextForSearch
      tags
      ddx
      questions {
        id
        questionStem
        questionAnswerText
        options
        answers
      }
    }
  }
`;
