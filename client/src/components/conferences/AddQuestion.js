import React, { Component } from 'react';
import { Segment, Modal, Button, Form } from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';
import { statSync } from 'fs';

class AddQuestion extends Component {
  state = {
    addingQuestion: this.props.addingQuestion
      ? this.props.addingQuestion
      : false,
    questionStem: this.props.questionStem ? this.props.questionStem : '',
    questionId: this.props.questionId ? this.props.questionId : '12345',
    questionAnswerText: '',
    options: this.props.options ? this.props.options : [],
    answers: this.props.answers ? this.props.answers : [],
  };

  addQuestion = () => {
    this.setState({ addingQuestion: true });
  };

  cancelAddingQuestion = () => {
    if (!this.props.isEditing) {
      this.setState({
        addingQuestion: false,
        questionStem: '',
        questionAnswerText: '',
        options: [],
      });
    } else {
      this.setState({ addingQuestion: false });
    }
  };

  showButton = () => {
    return (
      <Button onClick={() => this.addQuestion()}>
        {this.props.buttonText}
      </Button>
    );
  };

  answerChoiceChanged = (index, answer) => {
    var tempArray = this.state.options;
    tempArray[index].text = answer;
    this.setState({ options: tempArray });
  };

  checkBoxChanged = index => {
    var tempArray = this.state.options;
    tempArray[index].answer = !tempArray[index].answer;
    this.setState({ options: tempArray });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.answers) {
      var tempArray = [];
      nextProps.options.forEach(element => {
        if (nextProps.answers.includes(element)) {
          tempArray.push({ text: element, answer: true });
        } else {
          tempArray.push({ text: element, answer: false });
        }
      });
      return { options: tempArray };
    }
    return null;
  }

  displayAnswerChoices = () => {
    // console.log(this.state.options);
    // console.log(this.state.answers);

    if (this.state.options.length > 0) {
      return this.state.options.map(({ text, answer }, index) => {
        return (
          <Form.Group key={index}>
            <Form.Input
              value={text}
              onChange={e => this.answerChoiceChanged(index, e.target.value)}
            />
            <Form.Checkbox
              checked={answer}
              onChange={e => this.checkBoxChanged(index)}
            />
            <Form.Button
              size={`mini`}
              onClick={() => this.deleteAnswerChoice(index)}
            >
              x
            </Form.Button>
          </Form.Group>
        );
      });
    }
  };

  deleteAnswerChoice = index => {
    var tempArray = this.state.options.slice();
    tempArray.splice(index, 1);
    this.setState({ options: tempArray });
  };

  addAnswerChoice = () => {
    var tempArray = this.state.options.slice();
    tempArray.push({
      text: `Option ${this.state.options.length}`,
      answer: false,
    });
    this.setState({ options: tempArray });
  };

  saveTheQuestion = addQuestionToCase => {
    var options = [];
    var answers = [];
    this.state.options.map(option => {
      options.push(option.text);
      if (option.answer) {
        answers.push(option.text);
      }
      return true;
    });

    if (
      options.length > 0 &&
      answers.length > 0 &&
      this.state.questionStem !== ''
    ) {
      addQuestionToCase({
        variables: {
          _case: this.props.caseId,
          _creator: jwt_decode(localStorage.getItem('VMIMRToken')).id,
          questionStem: this.state.questionStem,
          questionAnswerText: this.state.questionAnswerText,
          questionId: this.state.questionId,
          options,
          answers,
        },
      });
      if (!this.props.isEditing) {
        this.setState({
          addingQuestion: false,
          questionStem: '',
          questionAnswerText: '',
          options: [],
        });
      } else {
        this.setState({ addingQuestion: false });
      }
    } else {
      console.log('There was an error saving the question');
    }
  };

  showModal = () => {
    return (
      <Modal open={this.state.addingQuestion} size="large">
        <Modal.Header>Add a question</Modal.Header>
        <Segment>
          <Form>
            <Form.TextArea
              required={true}
              label="Question Stem"
              value={this.state.questionStem}
              onChange={e =>
                this.setState({
                  questionStem: e.target.value,
                })
              }
            />
            <Form.TextArea
              label="Question Answer Text"
              value={this.state.questionAnswerText}
              placeholder="What is shown when the answer is revealed"
              onChange={e =>
                this.setState({
                  questionAnswerText: e.target.value,
                })
              }
            />
            {this.displayAnswerChoices()}
            <Button onClick={() => this.addAnswerChoice()}>
              Add Answer Choice
            </Button>

            <Button
              onClick={() => this.saveTheQuestion(this.props.addQuestionToCase)}
            >
              Save
            </Button>

            <Button onClick={() => this.cancelAddingQuestion()}>Cancel</Button>
          </Form>
        </Segment>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        {this.state.addingQuestion ? this.showModal() : this.showButton()}
      </div>
    );
  }
}

export default AddQuestion;
