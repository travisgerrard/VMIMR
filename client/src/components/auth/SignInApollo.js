import React, { Component } from 'react';
import { Form, Button, Grid, Segment } from 'semantic-ui-react';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

export default class SignInApollo extends Component {
  state = {
    login: '',
  };

  handleSubmit = () => {
    console.log(this.state.login);
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
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large" onSubmit={() => this.handleSubmit()}>
              <Segment.Group stacked>
                <Segment style={titleStyle}>Username (Cerner login)</Segment>
                <Segment>
                  <Form.Input
                    placeholder="j12345"
                    autoCapitalize="none"
                    name="username"
                    value={this.state.login}
                    onChange={e => this.setState({ login: e.target.value })}
                  />
                </Segment>
                <Segment>
                  <Button
                    style={{
                      background: '#E8F4DF',
                      fontFamily: 'Lato',
                    }}
                    fluid
                    size="large"
                  >
                    Login
                  </Button>
                </Segment>
              </Segment.Group>
            </Form>
            {this.renderAlert()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
