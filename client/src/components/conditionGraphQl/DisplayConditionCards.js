import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import './markdown.css';

class DisplayConditionCards extends Component {
  showIcons = (createdById, conditionId, learningId) => {
    if (createdById === this.props.currentUser.id) {
      return (
        <Image floated="right">
          <Icon
            name="edit"
            style={{ cursor: 'pointer', color: '#00824d' }}
            onClick={() => this.props.editLearning(learningId)}
          />
          <Link to={`/conditions/condition/${conditionId}`}>
            <Icon
              name="expand"
              style={{ cursor: 'pointer', color: '#00824d' }}
            />
          </Link>
        </Image>
      );
    } else {
      return (
        <Image floated="right">
          <Link to={`/conditions/condition/${conditionId}`}>
            <Icon
              name="expand"
              style={{ cursor: 'pointer', color: '#00824d' }}
            />
          </Link>{' '}
        </Image>
      );
    }
  };

  cardHeader = ({ condition, tags, id }, createdById, learningId) => {
    return (
      <Card.Content style={{ background: '#E5F5DD' }}>
        {this.showIcons(createdById, id, learningId)}
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
          {this.cardHeader(_condition, learning._creator.id, learning.id)}
          {this.conditionLearnings(learning)}
        </Card>
      );
    });
  };

  render() {
    return (
      <Card.Group itemsPerRow={3} stackable doubling>
        {this.showCondition(this.props.learnings)}
      </Card.Group>
    );
  }
}

export default DisplayConditionCards;
