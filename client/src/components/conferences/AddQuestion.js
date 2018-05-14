import React, { Component } from 'react';
import {
  Container,
  Segment,
  Modal,
  List,
  Button,
  Form,
} from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';

class AddQuestion extends Component {
  state = {
    addingQuestion: true,
    questionStem: '',
    options: [{ text: 'one', answer: true }, { text: 'two', answer: false }],
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

  saveTheQuestion = () => {
    console.log(this.state);
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
            <Button onClick={() => this.saveTheQuestion()}>Save</Button>
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
