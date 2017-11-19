import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import AuthFormFields from './AuthFormFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit = ({ email, password }) => {
    // call action creator to sign up the user!
    this.props.signupUser({ email, password, history: this.props.history });
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="red-text" style={{ marginBottom: '10px' }}>
          <strong>Ooops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <div>
            <Field
              name="email"
              label="Email"
              component={AuthFormFields}
              type="text"
            />
          </div>
          <div>
            <Field
              name="password"
              label="Password"
              component={AuthFormFields}
              type="password"
            />
          </div>
          <div>
            <Field
              name="passwordConfirm"
              label="Confirm Password"
              component={AuthFormFields}
              type="password"
            />
          </div>
          {this.renderAlert()}
          <button type="submit" className="green btn-flat white-text">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Password confirm is required';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup'
})(connect(mapStateToProps, actions)(withRouter(Signup)));
