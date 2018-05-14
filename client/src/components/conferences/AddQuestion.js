import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  Container,
  Segment,
  Modal,
  List,
  Button,
  Form,
} from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

import ADD_QUESTION from '../../mutations/AddQuestionToCase';
import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

class AddQuestion extends Component {
  state = {
    addingQuestion: false,
    questionStem: '',
    options: [],
  };

  addQuestion = () => {
    this.setState({ addingQuestion: true });
  };

  showButton = () => {
    return <Button onClick={() => this.addQuestion()}>Add Question</Button>;
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

  displayAnswerChoices = () => {
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
          </Form.Group>
        );
      });
    }
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
    });
    if (
      options.length > 0 &&
      answers.length > 0 &&
      this.state.questionStem !== ''
    ) {
      addQuestionToCase({
        variables: {
          _case: this.props.caseId,
          _creator: jwt_decode(localStorage.getItem('VMIMRToken')).sub,
          questionStem: this.state.questionStem,
          options,
          answers,
        },
      });
      this.setState({ addingQuestion: false });
    } else {
      console.log('There was an error saving the question');
    }
    console.log(options, answers);

    //    console.log(this.state);
    console.log(this.props.caseId);
    console.log(jwt_decode(localStorage.getItem('VMIMRToken')).sub);
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
            {this.displayAnswerChoices()}
            <Button onClick={() => this.addAnswerChoice()}>
              Add Answer Choice
            </Button>
            <Mutation
              mutation={ADD_QUESTION}
              refetchQueries={[
                {
                  query: SELECTED_CASE_PRESENTATIONS,
                  variables: { id: this.props.caseId },
                },
              ]}
            >
              {addQuestionToCase => (
                <Button onClick={() => this.saveTheQuestion(addQuestionToCase)}>
                  Save
                </Button>
              )}
            </Mutation>
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
