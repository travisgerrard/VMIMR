import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import urology from './urology';

class RotatationContentContainer extends Component {
  render() {
    console.log(urology);
    const { rotation, location, contact, conferences } = urology[
      this.props.dbname
    ];
    console.log(this.props.dbname);
    return (
      <div>
        <h1>{rotation}</h1>
        <p>Where: {location}</p>
        <Link to={`/conditions/${this.props.dbname}`}>
          {this.props.dbname} conditions
        </Link>
        <h4>Contact:</h4>
        <ul>
          <li>Name: {contact.name}</li>
          <li>Number: {contact.number}</li>
          <li>Email: {contact.email}</li>
        </ul>
        <h4>Conferences:</h4>
        {_.map(conferences, conference => {
          return (
            <div key={conference.name}>
              <p>{conference.name}</p>
              <ul>
                <li>{conference.when}</li>
                <li>{conference.where}</li>
                {conference.comments ? <li>{conference.comments}</li> : ''}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RotatationContentContainer;
