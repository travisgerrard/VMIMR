import gql from 'graphql-tag';

export default gql`
  mutation UpdateCasePresentation(
    $id: ID!
    $_presentor: ID
    $title: String
    $presentationDate: String
    $hpi: String
    $ros: String
    $physicalExam: String
    $wbc: String
    $hgb: String
    $plt: String
    $Na: String
    $K: String
    $Cl: String
    $HC02: String
    $BUN: String
    $Cr: String
    $Glu: String
    $AP: String
    $ALT: String
    $AST: String
    $Tbili: String
    $imaging: String
    $additionalLabs: String
    $summAssessment: String
    $embedPresentationSting: String
    $slideTextForSearch: String
    $tags: [String]
    $meds: [String]
    $medSurgHx: [String]
    $social: [String]
    $ddx: [String]
  ) {
    updateCasePresentation(
      id: $id
      _presentor: $_presentor
      title: $title
      presentationDate: $presentationDate
      hpi: $hpi
      ros: $ros
      physicalExam: $physicalExam
      wbc: $wbc
      hgb: $hgb
      plt: $plt
      Na: $Na
      K: $K
      Cl: $Cl
      HC02: $HC02
      BUN: $BUN
      Cr: $Cr
      Glu: $Glu
      AP: $AP
      ALT: $ALT
      AST: $AST
      Tbili: $Tbili
      imaging: $imaging
      additionalLabs: $additionalLabs
      summAssessment: $summAssessment
      embedPresentationSting: $embedPresentationSting
      slideTextForSearch: $slideTextForSearch
      tags: $tags
      meds: $meds
      medSurgHx: $medSurgHx
      social: $social
      ddx: $ddx
    ) {
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
        questionStem
        options
        answers
      }
    }
  }
`;
