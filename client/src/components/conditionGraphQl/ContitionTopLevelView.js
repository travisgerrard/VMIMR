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
import { Query, withApollo, graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import './markdown.css';
import GET_ALL_LEARNING from '../../queries/ListOfLearning';
import GET_CURRENT_USER from '../../queries/CurrentUser';

class ConditionTopLevelViewGQL extends Component {
  cardHeader = ({ condition, tags }) => {
    return (
      <Card.Content style={{ background: '#E5F5DD' }}>
        <Card.Header>{condition}</Card.Header>
        <Card.Meta>Tags: {tags.join(', ')}</Card.Meta>
      </Card.Content>
    );
  };

  returnUsersTagged = usersTagged => {
    if (usersTagged.length > 0) {
      const userTaggedLen = usersTagged.length;
      return (
        <Card.Meta>
          Learned With:{' '}
          {usersTagged.map((user, i) => {
            var userFirstName = user.name.split(' ')[0];
            if (userTaggedLen !== i + 1) {
              userFirstName = `${userFirstName}, `;
            }
            return <span key={user.id}>{userFirstName}</span>;
          })}
        </Card.Meta>
      );
    }
  };

  conditionLearnings = learning => {
    const {
      id,
      seenWith,
      dateField,
      whatWasLearned,
      _creator,
      usersTagged,
    } = learning;
    return (
      <Card.Content key={id}>
        <Card.Meta>Created by: {_creator.name}</Card.Meta>
        <Card.Meta>
          Seen With: {seenWith} on {dateField}
        </Card.Meta>
        {this.returnUsersTagged(usersTagged)}
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

          const currentUserQuery = this.props.client.readQuery({
            query: GET_CURRENT_USER,
          });

          console.log(currentUserQuery.currentUser);

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

export default withApollo(graphql(GET_CURRENT_USER)(ConditionTopLevelViewGQL));
