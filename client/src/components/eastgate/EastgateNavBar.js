import React, { Component } from 'react';
import Scrollspy from 'react-scrollspy';

import './Eastgate.css';

class EastgateNavBar extends Component {
  state = {
    initialLoad: true,
  };

  render() {
    return (
      <div>
        <ul style={{ paddingLeft: 0 }}>
          <Scrollspy
            items={this.props.content.map(({ sectionIndex }) => {
              return sectionIndex.toString();
            })}
            offset={-100}
            currentClassName="is-current"
            style={{ paddingLeft: 15 }}
          >
            {this.props.content.map(({ id, sectionIndex, sectionTitle }) => {
              return (
                <ul key={id} style={{ paddingLeft: 0 }} className="is-current">
                  <a
                    href={`#${sectionIndex.toString()}`}
                  >{`${sectionIndex.toFixed(1)} ${sectionTitle}`}</a>
                </ul>
              );
            })}
          </Scrollspy>
        </ul>
      </div>
    );
  }
}

export default EastgateNavBar;
