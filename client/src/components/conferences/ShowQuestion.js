import React, { Component } from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import _ from 'lodash';

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

  render() {
    return (
      <Segment>
        {this.showQuestions()}
        <Button
          style={{ marginTop: 20 }}
          onClick={() =>
            this.setState({ showAnswers: !this.state.showAnswers })
          }
        >
          {this.state.showAnswers ? 'Hide Answers' : 'Show Answers'}
        </Button>
      </Segment>
    );
  }
}

export default ShowQuestion;
