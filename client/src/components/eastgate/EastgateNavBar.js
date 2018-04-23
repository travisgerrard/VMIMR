import React, { Component } from 'react';

class EastgateNavBar extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.content.map(({ id, sectionIndex, sectionTitle }) => {
            return <li key={id}>{`${sectionIndex} ${sectionTitle}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default EastgateNavBar;
