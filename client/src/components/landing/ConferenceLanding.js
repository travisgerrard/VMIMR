import React, { Component } from 'react';
import { Segment, Button, Modal, Loader } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import LIST_ALL_CASE_PRESENTATIONS from '../../queries/ListOfAllCasePresentations';

import NoonConferenceView from '../conferences/NoonConferenceView';

const titleStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'thin',
  lineHeight: 'normal',
  fontSize: '24px',
  backgroundColor: '#E8F4F7',
  padding: 10,
};

const sectionStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'thin',
  lineHeight: 'normal',
  fontSize: '18px',
  padding: 10,
};

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
};

class ConferenceLanding extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment style={titleStyle}>
          Latests Conferences
          <br />
          <Button
            size="tiny"
            style={{
              backgroundColor: '#5E9B6A',
              fontFamily: 'Lato',
              fontStyle: 'normal',
              fontWeight: 'lighter',
            }}
            primary
          >
            <Link to="/Conference" style={{ color: 'white' }}>
              Goto Conference Section
            </Link>
          </Button>
        </Segment>
        <Segment style={sectionStyle}>
          <Query query={LIST_ALL_CASE_PRESENTATIONS}>
            {({ loading, error, data }) => {
              if (loading) return <Loader active inline="centered" />;
              if (error) return `Error! ${error.message}`;

              if (data.listOfAllCasePresentations.length > 0) {
                var presentations = data.listOfAllCasePresentations.slice(0, 5);

                return (
                  <div>
                    {presentations.map(casePresentation => {
                      return (
                        <NoonConferenceView
                          key={casePresentation.id}
                          presentationData={casePresentation}
                        />
                      );
                    })}
                  </div>
                );
              }
              return <div />;
            }}
          </Query>
        </Segment>
      </Segment.Group>
    );
  }
}

export default ConferenceLanding;
