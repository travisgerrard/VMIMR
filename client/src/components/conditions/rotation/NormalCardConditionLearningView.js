import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';

const TEXTLENGTH = 140;

class NormalCardConditionLearningView extends Component {
  state = { showAllText: false };

  learningText = text => {
    if (this.state.showAllText) {
      return text;
    } else {
      return text.substring(0, TEXTLENGTH);
    }
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
              bottom: '1em',
              height: '1em',
              background:
                '-webkit-linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
              backgroundImage:
                '-moz-linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
              backgroundImage:
                '-o-linear-gradient(rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 100%)',
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
              backgroundImage:
                '-ms-linear-gradient(rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 100%)'
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

  render() {
    const { seenWith, dateField, whatWasLearned, editLearning } = this.props;

    return (
      <Card.Content>
        <Image floated="right">
          <Icon
            name="edit"
            color="grey"
            style={{ cursor: 'pointer' }}
            onClick={editLearning}
          />
        </Image>
        <Card.Meta>
          Seen With: {seenWith} on {dateField}
        </Card.Meta>
        <Card.Description>
          <span style={{ whiteSpace: 'pre-line' }}>
            {this.learningText(whatWasLearned)}

            {this.showAllTextButton(whatWasLearned)}
          </span>
        </Card.Description>
      </Card.Content>
    );
  }
}

export default NormalCardConditionLearningView;
