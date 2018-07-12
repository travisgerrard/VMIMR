import React, { Component } from 'react';
import {
  Button,
  Card,
  Loader,
  Container,
  Image,
  Icon,
} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import jwt_decode from 'jwt-decode';

import Questions from './Questions';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';
class NoonConferenceViewBlog extends Component {
  render() {
    let currentUser = '';
    if (localStorage.getItem('VMIMRToken')) {
      currentUser = jwt_decode(localStorage.getItem('VMIMRToken'));
    }
    const admin = currentUser.admin;

    const {
      title,
      _presentor,
      presentationDate,
      presentationType,
      id,
      embedPresentationSting,
      questions,
    } = this.props.presentationData;

    let name;
    if (_presentor) {
      name = _presentor.name;
    } else {
      name = '';
    }
    const questionsLength = questions.length ? true : false;

    return (
      <Container style={{ marginTop: 25 }}>
        <Card fluid>
          <Card.Content>
            <Image floated="right">
              {admin && (
                <span>
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
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{`By ${name} on ${presentationDate}`}</Card.Meta>
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
                caseId={id}
                abilityToEdit={false}
              />
            )}
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default NoonConferenceViewBlog;
