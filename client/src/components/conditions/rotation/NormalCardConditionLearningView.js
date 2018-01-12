import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

const TEXTLENGTH = 200;

class NormalCardConditionLearningView extends Component {
  state = { showAllText: false };

  linkRenderer = props => {
    return (
      <a href={props.href} target="_blank">
        {props.children}
      </a>
    );
  };

  learningText = text => {
    if (this.state.showAllText) {
      return <ReactMarkdown source={text} />;
    } else {
      return <ReactMarkdown source={text.substring(0, TEXTLENGTH)} />;
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
          <span style={{ whiteSpace: 'pre-wrap' }}>
            {this.learningText(whatWasLearned)}
            {this.showAllTextButton(whatWasLearned)}
          </span>
        </Card.Description>
      </Card.Content>
    );
  }
}

export default NormalCardConditionLearningView;
