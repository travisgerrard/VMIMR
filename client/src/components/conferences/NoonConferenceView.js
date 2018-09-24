import React, { Component } from 'react';
import {
  Card,
  Loader,
  Image,
  Icon,
  Divider,
  Container,
} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import jwt_decode from 'jwt-decode';
import NoonConference from './NoonConference';

import Questions from './Questions';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  background: '#FDFDFD',
};

const fontStyleTitle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
};

class NoonConferenceView extends Component {
  static defaultProps = {
    presentationData: null,
  };

  state = {
    expanded: false,
  };

  render() {
    let currentUser = '';
    if (localStorage.getItem('VMIMRToken')) {
      currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    }
    const admin = currentUser.admin;

    if (this.props.presentationData) {
      const {
        title,
        _presentor,
        presentationDate,
        presentationType,
        id,
        summAssessment,
      } = this.props.presentationData;

      let name;
      if (_presentor) {
        name = _presentor.name;
      } else {
        name = '';
      }
      const isCaseReport = presentationType === 'case' ? true : false;

      return (
        <Card fluid style={fontStyle}>
          <Card.Content>
            <Image floated="right">
              <Link to={`/Conference/${id}`}>
                <Icon
                  name="window maximize"
                  style={{
                    marginLeft: 6,
                    cursor: 'pointer',
                    color: '#00824d',
                  }}
                />
              </Link>

              {admin && (
                <span>
                  <Link to={`/ConferenceAdmin/${id}`}>
                    <Icon
                      name="edit"
                      style={{
                        marginLeft: 6,
                        cursor: 'pointer',
                        color: '#00824d',
                      }}
                    />
                  </Link>
                </span>
              )}
            </Image>

            <Card.Header style={fontStyleTitle}>
              <Link to={`/Conference/${id}`} style={{ color: 'black' }}>
                {title}
              </Link>
            </Card.Header>
            <hr />
            <Card.Meta>{`By ${name} on ${presentationDate}`}</Card.Meta>
            <Card.Meta>{`Type of presentation: ${presentationType}`}</Card.Meta>
          </Card.Content>
          {isCaseReport && (
            <Card.Content
              style={{
                fontFamily: 'Lato',
                fontStyle: 'thin',
              }}
            >
              {summAssessment}
            </Card.Content>
          )}
        </Card>
      );
    } else {
      //Looking at a specific conference
      const caseId = this.props.match.params.id;
      return (
        <Query query={SELECTED_CASE_PRESENTATIONS} variables={{ id: caseId }}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            const {
              title,
              _presentor,
              presentationDate,
              presentationType,
              embedPresentationSting,
              questions,
            } = data.selectedCasePresentation;

            const isCaseReport = presentationType === 'case' ? true : false;

            let name;
            if (_presentor) {
              name = _presentor.name;
            } else {
              name = '';
            }

            const questionsLength = questions.length ? true : false;

            return (
              <Container style={{ marginTop: '15px' }}>
                <Card fluid style={fontStyle}>
                  <Card.Content>
                    <Card.Header style={fontStyleTitle}>{title}</Card.Header>
                    <Card.Meta>{`By ${name} on ${presentationDate}`}</Card.Meta>
                    {admin && (
                      <Image floated="right">
                        <Link to={`/ConferenceAdmin/${caseId}`}>
                          <Icon
                            name="edit"
                            style={{
                              cursor: 'pointer',
                              color: '#00824d',
                            }}
                          />
                        </Link>
                      </Image>
                    )}
                  </Card.Content>
                  <Card.Content>
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                      <ReactMarkdown
                        source={embedPresentationSting}
                        escapeHtml={false}
                      />
                    </span>
                    {questionsLength && (
                      <Questions
                        questions={questions}
                        caseId={caseId}
                        abilityToEdit={false}
                      />
                    )}
                    {isCaseReport && (
                      <div>
                        <Divider />
                        <h2>The Case</h2>
                        <NoonConference
                          viewOnly={true}
                          presentationData={data.selectedCasePresentation}
                        />
                      </div>
                    )}
                  </Card.Content>
                </Card>
              </Container>
            );
          }}
        </Query>
      );
    }
  }
}

export default withRouter(NoonConferenceView);
