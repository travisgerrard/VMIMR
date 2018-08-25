import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import './markdown.css';

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
};

const fontStyleTitle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
};

class DisplayConditionCards extends Component {
  state = {
    allLearning: this.props.learnings,
    items: this.props.learnings.slice(0, 10),
    itemLength: 10,
    hasMore: true,
  };

  // getDerivedStateFromProps updates items after refectchQueries is run.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.learnings !== prevState.allLearning) {
      return {
        items: nextProps.learnings.slice(0, prevState.itemLength),
        allLearning: nextProps.learnings,
      };
    }
    return null;
  }

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

  cardHeader = ({ condition, id }, tags, createdById, learningId) => {
    return (
      <Card.Content style={{ background: '#E5F5DD' }}>
        {this.showIcons(createdById, id, learningId)}
        <Card.Header style={fontStyleTitle}>{condition}</Card.Header>
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
      <Card.Content key={id} style={{ backgroundColor: '#FDFDFD' }}>
        <Card.Meta>Created by: {_creator.name}</Card.Meta>
        <Card.Meta>
          Seen With: {seenWith} on {dateField}
        </Card.Meta>
        {this.returnUsersTagged(usersTagged)}
        <Card.Description>
          <span style={{ whiteSpace: 'pre-wrap' }}>
            <ReactMarkdown source={whatWasLearned} escapeHtml={false} />
          </span>
        </Card.Description>
      </Card.Content>
    );
  };

  showCondition = listOfConditions => {
    return listOfConditions.map(learning => {
      const { _condition } = learning;
      return (
        <Card centered key={learning.id} style={fontStyle}>
          {this.cardHeader(
            _condition,
            learning.tags,
            learning._creator.id,
            learning.id,
          )}
          {this.conditionLearnings(learning)}
        </Card>
      );
    });
  };

  fetchMoreData = () => {
    var itemLength = this.state.items.length;

    if (itemLength + 5 >= this.props.learnings.length) {
      this.setState({ hasMore: false });
    }

    const newItems = this.state.items.concat(
      this.props.learnings.slice(itemLength, itemLength + 5),
    );

    this.setState({
      items: newItems,
      itemLength,
    });
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={() => this.fetchMoreData()}
        hasMore={this.state.hasMore}
        loader={<div />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You've learned so much</b>
          </p>
        }
      >
        <Card.Group
          itemsPerRow={this.props.numItemsPerRow ? 1 : 3}
          stackable
          doubling
          style={{
            marginLeft: 2,
            marginRight: 2,
            marginBottom: 0,
            marginTop: 5,
          }}
        >
          {this.showCondition(this.state.items)}
        </Card.Group>
      </InfiniteScroll>
    );
  }
}

export default DisplayConditionCards;

/*
itemsPerRow={this.props.numItemsPerRow ? 1 : 3}
Terinary is so that last 3 load as column, but main page display's 3
*/
