import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { Form, Container } from 'semantic-ui-react';
import SigninField from '../users/UserInputField';

class Signin extends Component {
  handleFormSubmit = ({ username, password }) => {
    this.props.signinUser({ username, password, history: this.props.history });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div style={{ marginBottom: '10px', color: 'red' }}>
          <strong>Ooops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Field
            component={SigninField}
            label="Username"
            name="username"
            placeholder="j12345"
            autoCapitalize="none"
          />
          <Field
            component={SigninField}
            label="Password"
            name="password"
            placeholder="password"
            type="password"
          />

          {this.renderAlert()}
          <Form.Button color="green" type="submit">
            Submit
          </Form.Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin' // no fields array given
})(connect(mapStateToProps, actions)(withRouter(Signin)));
