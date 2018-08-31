import gql from "graphql-tag";

export default gql`
  query ConferencesForRotation($rotation: String) {
    ConferencesForRotation(rotation: $rotation) {
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
