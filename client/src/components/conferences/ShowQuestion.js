import React, { Component } from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import AddQuestion from './AddQuestion';

import DELETE_QUESTION from '../../mutations/DeleteQuestion';
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
    console.log(this.props);
    return (
      <AddQuestion
        caseId={this.props.caseId}
        questionStem={this.props.questionStem}
        addingQuestion={true}
      />
    );
  };

  copyQuestion = () => {
    var pollyCopy = `[anon] "${this.props.questionStem}"`;
    console.log(this.props.questionStem);
    this.props.options.forEach(option => {
      pollyCopy = pollyCopy + ` "${option}"`;
    });
    console.log(pollyCopy);
  };

  render() {
    console.log(this.props.abilityToEdit);

    return (
      <Segment>
        {this.showQuestions()}
        {this.state.showAnswers &&
          this.props.questionAnswerText && (
            <Segment>
              <span style={{ whiteSpace: 'pre-wrap' }}>
                <ReactMarkdown
                  source={this.props.questionAnswerText}
                  escapeHtml={false}
                />
              </span>
            </Segment>
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
          <Button onClick={() => this.editQuestion()}>Edit Question</Button>
        )}
        {this.props.abilityToEdit && (
          <Button onClick={() => this.copyQuestion()}>Copy For Poll</Button>
        )}
      </Segment>
    );
  }
}

export default ShowQuestion;
