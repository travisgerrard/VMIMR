import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import RotationNavBar from './RotationNavBar';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
  };

  handleMenubarItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Grid>
          <Grid.Column width={4}>
            <RotationNavBar
              activeItem={this.state.activeItem}
              handleMenubarItemClick={this.handleMenubarItemClick}
            />
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <h1>{this.state.activeItem}</h1>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default RotationTopLevelView;
