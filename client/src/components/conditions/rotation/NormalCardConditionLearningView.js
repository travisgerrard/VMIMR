import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import _ from 'lodash';
import './markdown.css';

const TEXTLENGTH = 200;

class NormalCardConditionLearningView extends Component {
  state = { showAllText: false };

  learningText = text => {
    //if (this.state.showAllText) {
    return <ReactMarkdown source={text} />;
    //} else {
    //  return <ReactMarkdown source={text.substring(0, TEXTLENGTH)} />;
    //}
  };

  showAllTextButton = text => {
    const showTextBool = this.state.showAllText;
    //Style below makes it so the text has a fadout
    if (text.length >= TEXTLENGTH && !showTextBool) {
      return (
        <div>
          <div
            style={{
              position: 'relative',
              bottom: '25px',
              height: '10px',
              background:
                '-webkit-linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
              backgroundImage: [
                '-moz-linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                '-o-linear-gradient(rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 100%)',
                'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
                '-ms-linear-gradient(rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 100%)'
              ]
            }}
          />
          <Button
            compact
            fluid
            basic
            onClick={() =>
              this.setState({
                showAllText: !showTextBool
              })
            }
          >
            Show all text
          </Button>
        </div>
      );
    } else if (text.length >= TEXTLENGTH && showTextBool) {
      return (
        <Button
          compact
          fluid
          basic
          onClick={() =>
            this.setState({
              showAllText: !showTextBool
            })
          }
        >
          Hide text
        </Button>
      );
    }
  };

  showEditButton = () => {
    if (this.props.canEdit) {
      return (
        <Image floated="right">
          <Icon
            name="edit"
            color="grey"
            style={{ cursor: 'pointer' }}
            onClick={this.props.editLearning}
          />
        </Image>
      );
    }
  };

  //            {this.showAllTextButton(whatWasLearned)}

  render() {
    const {
      users,
      usersTagged,
      seenWith,
      dateField,
      whatWasLearned,
      editLearning
    } = this.props;

    console.log(users);
    console.log(`usersTagged: ${usersTagged}`);
    const learnedWith = _.map(usersTagged, user => {
      console.log(`user: ${user}`);
      return users[user].name;
    });
    const learendWithText = learnedWith.length ? (
      <Card.Meta>Learned with: {learnedWith.join(', ')}</Card.Meta>
    ) : (
      ''
    );

    return (
      <Card.Content>
        {this.showEditButton()}
        <Card.Meta>
          Seen With: {seenWith} on {dateField}
        </Card.Meta>
        {learendWithText}
        <Card.Description>
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {this.learningText(whatWasLearned)}
          </span>
        </Card.Description>
      </Card.Content>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(NormalCardConditionLearningView);
