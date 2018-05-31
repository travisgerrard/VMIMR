import gql from 'graphql-tag';

export default gql`
  query HasUserFilledOutSurvey($id: ID) {
    doseSurveyWithUserIdExist(id: $id) {
      id
    }
  }
`;
