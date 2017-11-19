import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signinUser({ email, password, history: this.props.history });
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
            <label>Email</label>
            <div>
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="test@test.com"
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </div>
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

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin' // no fields array given
})(connect(mapStateToProps, actions)(withRouter(Signin)));
