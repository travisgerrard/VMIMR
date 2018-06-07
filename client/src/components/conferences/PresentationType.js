import React, { Component } from 'react';
import { Container, Segment, Form, Grid } from 'semantic-ui-react';

//morning, case, specialist, primaryCare

class PresentationType extends Component {
  render() {
    const { presentationType } = this.props;
    console.log(presentationType);

    return (
      <Container>
        <Segment style={{ marginTop: 20 }}>
          <Form>
            <label style={{ marginBottom: 10 }}>Presentation Type</label>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Form.Group inline>
                    <Form.Radio
                      label="General"
                      value={presentationType}
                      checked={presentationType === 'general'}
                      onChange={() =>
                        this.props.updateConferenceInputState(
                          'presentationType',
                          'general',
                        )
                      }
                    />
                    <Form.Radio
                      label="Morning"
                      value={presentationType}
                      checked={presentationType === 'morning'}
                      onChange={() =>
                        this.props.updateConferenceInputState(
                          'presentationType',
                          'morning',
                        )
                      }
                    />
                    <Form.Radio
                      label="Case"
                      value={presentationType}
                      checked={presentationType === 'case'}
                      onChange={() =>
                        this.props.updateConferenceInputState(
                          'presentationType',
                          'case',
                        )
                      }
                    />
                    <Form.Radio
                      label="Specialist"
                      value={presentationType}
                      checked={presentationType === 'specialist'}
                      onChange={() =>
                        this.props.updateConferenceInputState(
                          'presentationType',
                          'specialist',
                        )
                      }
                    />
                    <Form.Radio
                      label="Primary Care"
                      value={presentationType}
                      checked={presentationType === 'primaryCare'}
                      onChange={() =>
                        this.props.updateConferenceInputState(
                          'presentationType',
                          'primaryCare',
                        )
                      }
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default PresentationType;
