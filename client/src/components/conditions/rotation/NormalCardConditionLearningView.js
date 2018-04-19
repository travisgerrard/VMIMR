import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
//import _ from 'lodash';
import './markdown.css';

class NormalCardConditionLearningView extends Component {
  state = { showAllText: false };

  learningText = text => {
    return <ReactMarkdown source={text} />;
  };

  showEdit = () => {
    const didUserCreate =
      this.props._creator === this.props.auth.userDetails.sub;
    if (didUserCreate) return true;
    return false;
  };

  showEditButton = () => {
    if (this.props.canEdit && this.showEdit()) {
      return (
        <Image floated="right">
          <Icon
            name="edit"
            style={{ cursor: 'pointer', color: '#00824d' }}
            onClick={this.props.editLearning}
          />
        </Image>
      );
    }
  };

  render() {
    const {
      // users,
      // usersTagged,
      seenWith,
      dateField,
      whatWasLearned,
    } = this.props;

    var learendWithText = <div />;
    //console.log(this.props);
    // if (usersTagged.length > 0) {
    //   const learnedWith = _.map(usersTagged, user => {
    //     return users[user].name;
    //   });
    //   learendWithText = learnedWith.length ? (
    //     <Card.Meta>Learned with: {learnedWith.join(', ')}</Card.Meta>
    //   ) : (
    //     ''
    //   );
    // }

    //const createdBy = console.log();

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
