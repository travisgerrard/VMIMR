import React, { Component } from 'react';
import {
  Card,
  Icon,
  Image,
  Input,
  Button,
  Label,
  Message,
  Container,
} from 'semantic-ui-react';
import { Query } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import './markdown.css';
import GET_ALL_CONDITIONS from '../../queries/ListOfConditions';
import GET_ALL_LEARNING from '../../queries/ListOfLearning';

class ConditionTopLevelViewGQL extends Component {
  cardHeader = ({ condition, tags }) => {
    return (
      <Card.Content style={{ background: '#E5F5DD' }}>
        <Card.Header>{condition}</Card.Header>
        <Card.Meta>Tags: {tags.join(', ')}</Card.Meta>
      </Card.Content>
    );
  };

  conditionLearnings = learning => {
    const { id, seenWith, dateField, whatWasLearned } = learning;
    return (
      <Card.Content key={id}>
        <Card.Meta>
          Seen With: {seenWith} on {dateField}
        </Card.Meta>
        <Card.Description>
          <span style={{ whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown source={whatWasLearned} />
          </span>
        </Card.Description>
      </Card.Content>
    );
  };

  showCondition = listOfConditions => {
    return listOfConditions.map(learning => {
      const { _condition } = learning;
      return (
        <Card centered key={learning.id}>
          {this.cardHeader(_condition)}
          {this.conditionLearnings(learning)}
        </Card>
      );
    });
  };

  loadConditions = () => {
    return (
      <Query query={GET_ALL_LEARNING}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Card.Group>{this.showCondition(data.listOfLearning)}</Card.Group>
          );
        }}
      </Query>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        {this.loadConditions()}
      </Container>
    );
  }
}

export default ConditionTopLevelViewGQL;
