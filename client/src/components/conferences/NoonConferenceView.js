import React, { Component } from 'react';
import { Card, Loader, Container } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import Questions from './Questions';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

class NoonConferenceView extends Component {
  render() {
    if (this.props.match.params.id) {
      const caseId = this.props.match.params.id;
      return (
        <Query query={SELECTED_CASE_PRESENTATIONS} variables={{ id: caseId }}>
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            console.log(data.selectedCasePresentation);
            const {
              title,
              _presentor,
              presentationDate,
              embedPresentationSting,
              questions,
            } = data.selectedCasePresentation;
            return (
              <Container style={{ marginTop: 25 }}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{`By ${
                      _presentor.name
                    } on ${presentationDate}`}</Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Questions
                      questions={questions}
                      caseId={caseId}
                      abilityToEdit={false}
                    />
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                      <ReactMarkdown
                        source={embedPresentationSting}
                        escapeHtml={false}
                      />
                    </span>
                  </Card.Content>
                </Card>
              </Container>
            );
          }}
        </Query>
      );
    } else {
      const {
        title,
        _presentor,
        presentationDate,
        id,
        embedPresentationSting,
      } = this.props.presentationData;

      return (
        <Card fluid>
          <Card.Content href={`/Conference/${id}`}>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{`By ${
              _presentor.name
            } on ${presentationDate}`}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <span style={{ whiteSpace: 'pre-wrap' }}>
              <ReactMarkdown
                source={embedPresentationSting}
                escapeHtml={false}
              />
            </span>
          </Card.Content>
        </Card>
      );
    }
  }
}

export default withRouter(NoonConferenceView);
