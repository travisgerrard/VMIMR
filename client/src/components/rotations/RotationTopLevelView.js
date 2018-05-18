// Top level view that displayes menu as well as content

import React, { Component } from 'react';
import { Segment, Menu, List, Sidebar, Button } from 'semantic-ui-react';
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
    visible: false,
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

  changeVisibleMenu = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          borderless
          vertical
          visible={visible}
          style={{
            top: '3.3em',
          }}
        >
          <RotationNavBar
            rotationOnLanding={this.props.match.params.id}
            initialLoad={this.state.initialLoad}
            handleRotationOnLanding={this.handleRotationOnLanding}
            activeItem={this.state.activeItem}
            handleMenubarItemClick={this.handleMenubarItemClick}
          />
        </Sidebar>
        <Sidebar.Pusher>
          <Segment
            basic
            style={{
              marginTop: '3.3em',
            }}
          >
            {this.state.activeItemId ? (
              <div>
                <Button
                  size="tiny"
                  onClick={() => this.changeVisibleMenu()}
                  style={{
                    marginLeft: -14,
                    padding: 5,
                    display: 'inline-block',
                    float: 'left',
                  }}
                >
                  Menu {visible ? '<' : '>'}
                </Button>
                <RotationMainView
                  rotation={this.state.activeItem}
                  id={this.state.activeItemId}
                />
              </div>
            ) : (
              <div>
                <h1>Welcome to VMIMR rotations section</h1>
                <h2>Select a rotation</h2>
                <p>
                  Each rotation it broken out into 1. general info, 2. Providers
                  you'll work with on this rotation, 3. Learning you've
                  documented regarding a rotation and 4. A general comment
                  section regarding a rotation.
                </p>
                <Query query={GET_LIST_OF_ROTATIONS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    var sortedArray = data.listOfRotations.slice();
                    sortedArray.sort(function(a, b) {
                      if (a.title < b.title) return -1;
                      if (a.title > b.title) return 1;
                      return 0;
                    });

                    return sortedArray.map(rotation => {
                      return (
                        <div key={rotation.id}>
                          <List.Item style={{ marginTop: 5, fontSize: '18px' }}>
                            <Link to={`/rotations/${rotation.title}`}>
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
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default RotationTopLevelView;
