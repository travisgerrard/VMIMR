// Top level view that displayes menu as well as content

import React, { Component } from 'react';
import { Segment, Menu, List } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import RotationNavBar from './RotationNavBar';
import RotationMainView from './RotationMainView';

import GET_LIST_OF_ROTATIONS from '../../queries/ListOfRotations';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
    activeItemId: '',
    initialLoad: true,
  };

  handleMenubarItemClick = (e, { name, id }) => {
    //this.setState({ activeItem: name });
    //this.setState({ activeItemId: id });
    this.props.history.push(`/rotations/${name}`);
  };

  handleRotationOnLanding = (name, id) => {
    this.setState({ activeItem: name });
    this.setState({ activeItemId: id });
    this.setState({ initialLoad: false });
  };

  render() {
    return (
      <div>
        <Menu
          as={Menu}
          borderless
          vertical
          style={{
            position: 'fixed',
            top: '3.3em',
            bottom: '0px',
            overflowY: 'auto',
            width: '180px',
          }}
        >
          <RotationNavBar
            rotationOnLanding={this.props.match.params.id}
            initialLoad={this.state.initialLoad}
            handleRotationOnLanding={this.handleRotationOnLanding}
            activeItem={this.state.activeItem}
            handleMenubarItemClick={this.handleMenubarItemClick}
          />
        </Menu>
        <Segment
          basic
          style={{
            position: 'relative',
            marginLeft: '200px',
            marginTop: '3.3em',
          }}
        >
          {this.state.activeItemId ? (
            <RotationMainView
              rotation={this.state.activeItem}
              id={this.state.activeItemId}
            />
          ) : (
            <div>
              <h1>Welcome to VMIMR rotations section</h1>
              <h2>Select a rotation</h2>
              <p>Each rotation it broken out into 1. general info, 2. Providers you'll work with on this rotation, 3. Learning you've documented regarding a rotation and 4. A general comment section regarding a rotation.</p>
              <Query query={GET_LIST_OF_ROTATIONS}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;

                  var sortedArray = data.listOfRotations.slice();
                    sortedArray.sort(function(a,b) {
                      if ( a.title < b.title )
                          return -1;
                      if ( a.title > b.title )
                          return 1;
                      return 0;
                  } );

                  return sortedArray.map(rotation => {
                    return (
                      <div key={rotation.id}>
                        <List.Item style={{marginTop: 5, fontSize: '18px'}}>
                          <Link to={`/rotations/${rotation.title}`} >
                            {rotation.title}
                          </Link>
                        </List.Item>
                      </div>
                    );
                  });
                }}
              </Query>
            </div>
          )}
        </Segment>
      </div>
    );
  }
}

export default RotationTopLevelView;
