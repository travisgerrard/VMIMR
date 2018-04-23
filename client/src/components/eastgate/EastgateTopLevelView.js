import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import EastgateNavBar from './EastgateNavBar';
import EastgateManual from './EastgateManual';

class EastgateTopLevelView extends Component {
  state = {
    markdown: '',
  };

  componentWillMount() {
    const manualPath = require('./EastgateManual.md');
    fetch(manualPath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        this.setState({ markdown: text });
      });
  }

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Grid>
          <Grid.Column width={4} style={{ backgroundColor: '#F7F7F7' }}>
            <EastgateNavBar />
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <EastgateManual markdown={this.state.markdown} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default EastgateTopLevelView;
