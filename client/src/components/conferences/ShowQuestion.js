import React, { Component } from 'react';
import { List, Button, Message, Divider } from 'semantic-ui-react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import AddQuestion from './AddQuestion';

// Now need to delete the question - add in a button and wire it up...

class ShowQuestion extends Component {
  state = {
    showAnswers: false,
  };

  displayAnswerChoices = (options, answers) => {
    return options.map((option, index) => {
      if (this.state.showAnswers) {
        if (_.includes(answers, option)) {
          return (
            <List.Item key={option} as="li">
              <b>{option}</b>
            </List.Item>
          );
        }
        return (
          <List.Item key={option} as="li">
            {option}
          </List.Item>
        );
      }
      return (
        <List.Item key={option} as="li">
          {option}
        </List.Item>
      );
    });
  };

  showQuestions = () => {
    return (
      <div>
        <h2>{this.props.questionStem}</h2>
        <List as="ol">
          {this.displayAnswerChoices(this.props.options, this.props.answers)}
        </List>
      </div>
    );
  };

  editQuestion = () => {
    return (
      <AddQuestion
        caseId={this.props.caseId}
        questionStem={this.props.questionStem}
        addingQuestion={true}
      />
    );
  };

  copyQuestion = () => {
    var pollyCopy = `[anon] "${this.props.questionStem}`;
    this.props.options.forEach((option, index) => {
      // Way it was done for old Polly. pollyCopy = pollyCopy + `\n\n ${index + 1}. ${option} `;
      pollyCopy = pollyCopy + ` "${option}"`;
    });

    return pollyCopy;
  };

  onCopy = () => {
    this.setState({ copied: true });
  };

  render() {
    const pollyCopy = this.copyQuestion();

    return (
      <div>
        {this.showQuestions()}
        {this.state.showAnswers &&
          this.props.questionAnswerText && (
            <Message info>
              <Message.Header>Answer</Message.Header>

              <span style={{ whiteSpace: 'pre-wrap' }}>
                <ReactMarkdown
                  source={this.props.questionAnswerText}
                  escapeHtml={false}
                />
              </span>
            </Message>
          )}
        <Button
          style={{ marginTop: 20 }}
          onClick={() =>
            this.setState({ showAnswers: !this.state.showAnswers })
          }
        >
          {this.state.showAnswers ? 'Hide Answers' : 'Show Answers'}
        </Button>
        {this.props.abilityToEdit && (
          <AddQuestion
            isEditing={true}
            buttonText={`Edit Question`}
            {...this.props}
          />
        )}
        {this.props.abilityToEdit && (
          <CopyToClipboard text={pollyCopy}>
            <Button>Copy For Poll</Button>
          </CopyToClipboard>
        )}
        {this.props.abilityToEdit && (
          <Button
            onClick={() =>
              this.props.deleteQuestion({
                variables: { id: this.props.questionId },
              })
            }
          >
            Delete Question
          </Button>
        )}
        <Divider hidden />
      </div>
    );
  }
}

export default ShowQuestion;
