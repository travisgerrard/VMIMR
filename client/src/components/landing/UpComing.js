import React, { Component } from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import schedule from './amionSchedule';

const dayOptions = [
  {
    text: '5 days',
    value: 5,
  },
  {
    text: '7 days',
    value: 7,
  },
  {
    text: '14 days',
    value: 14,
  },
];

class UpComing extends Component {
  state = {
    days_to_add: 5,
  };
  returnArrayDataOfDatesWithinTimePeriod() {
    // Returns an array with a moment depicting date
    // and the name of the rotation on a date
    // Only returns data forrect current user
    // And only returns the number of days
    let arrayToDisplay = [];

    schedule.forEach(data => {
      // data comes from amionSchedule right now....
      if (data.Name === this.props.name) {
        const aMoment = moment()
          .year(`20${data.Date.split('-')[2]}`)
          .month(data.Date.split('-')[0] - 1)
          .date(data.Date.split('-')[1]);

        if (
          aMoment.isSameOrAfter(moment()) &&
          aMoment.isBefore(moment().add(this.state.days_to_add, 'd'))
        ) {
          arrayToDisplay.push({
            moment: aMoment,
            rotation: data.Rotation,
          });
        }
      }
    });
    return arrayToDisplay;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  cleanedUpArrayToDisplay(arrayToDisplay) {
    // Remove duplicate entries
    let shortenedArray = [];
    for (var i = 0; i < arrayToDisplay.length; i++) {
      if (arrayToDisplay[i + 1]) {
        if (arrayToDisplay[i].rotation === 'Eastgate, am') {
          shortenedArray.push({
            moment: arrayToDisplay[i].moment,
            rotation: 'Eastgate',
          });
          i++;
        } else if (arrayToDisplay[i].rotation === 'Vm u.village, am') {
          shortenedArray.push({
            moment: arrayToDisplay[i].moment,
            rotation: 'Vm u.village',
          });
          i++;
        } else if (arrayToDisplay[i].rotation === `Vm downtown, am`) {
          shortenedArray.push({
            moment: arrayToDisplay[i].moment,
            rotation: 'Vm downtown',
          });
          i++;
        } else {
          shortenedArray.push({
            moment: arrayToDisplay[i].moment,
            rotation: this.capitalizeFirstLetter(arrayToDisplay[i].rotation),
          });
        }
      } else {
        shortenedArray.push({
          moment: arrayToDisplay[i].moment,
          rotation: this.capitalizeFirstLetter(arrayToDisplay[i].rotation),
        });
      }
    }
    return shortenedArray;
  }

  render() {
    // Shorten to only next 5 days
    const arrayToDisplay = this.returnArrayDataOfDatesWithinTimePeriod();
    const shortenedArray = this.cleanedUpArrayToDisplay(arrayToDisplay);

    return (
      <Segment.Group style={{ paddingLeft: 15, backgroundColor: '#F5F5F5' }}>
        <Segment style={{ backgroundColor: '#F5F5F5' }}>
          <h4>
            <span>
              Here's what your next{' '}
              <Dropdown
                inline
                options={dayOptions}
                defaultValue={dayOptions[0].value}
                onChange={(params, data) =>
                  this.setState({ days_to_add: data.value })
                }
              />{' '}
              look like Dr. {this.props.name}
            </span>
          </h4>
        </Segment>
        <Segment.Group>
          {shortenedArray.map(data => {
            var linkText;
            if (data.rotation === 'Id') {
              linkText = 'Infectious%20Disease';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>Infectious Disease</Link>
                </Segment>
              );
            } else if (data.rotation === 'Gastro') {
              linkText = 'Gastroenterology%20(GI)';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Gastroenterology (GI)
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Ent') {
              linkText = 'Ears%20Nose%20Throat%20(ENT)';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Ears Nose Throat (ENT)
                  </Link>
                </Segment>
              );
            } else if (
              data.rotation === 'Eastgate' ||
              data.rotation === `Vm downtown, am` ||
              data.rotation === `Vm downtown, pm`
            ) {
              linkText = 'General%20Internal%20Medicine%20(GIM)';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{data.rotation}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Card') {
              linkText = 'Cardiology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Endo') {
              linkText = 'Endocrinology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Sys-base') {
              linkText = 'Systems%20based%20practice';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Systems based practice
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Rheum') {
              linkText = 'Rheumatology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ip-psych') {
              linkText = 'Psychiatry%20-%20Inpatient';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Psychiatry - Inpatient
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Gyn') {
              linkText = 'Gynecology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Hyperbaric') {
              linkText = 'Hyperbarics';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Pulm') {
              linkText = 'Pulmonology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Neph') {
              linkText = 'Nephrology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>Nephrology</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ccu') {
              linkText = 'CCU';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>CCU</Link>
                </Segment>
              );
            } else if (data.rotation === 'Allergy') {
              linkText = 'Allergy%20and%20immunology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Allergy and immunology
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Derm') {
              linkText = 'Dermatology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Palliative') {
              linkText = 'Palliative%20Care';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>Palliative Care</Link>
                </Segment>
              );
            } else if (data.rotation === 'Hem onc') {
              linkText = 'Hematology%20and%20Oncology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Hematology and Oncology
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Neuro') {
              linkText = 'Neurology';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ed') {
              linkText = 'Emergency%20Department';
              return (
                <Segment key={Math.random()}>
                  {data.moment.format('ddd, MMMM Do')}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Emergency Department
                  </Link>
                </Segment>
              );
            } else if (
              data.rotation === 'Wards - team a' ||
              data.rotation === 'Wards - team b' ||
              data.rotation === 'Wards - team c' ||
              data.rotation === 'Wards - team d'
            ) {
              linkText = 'Wards';
            } else {
              linkText = data.rotation;
            }

            return (
              <Segment key={Math.random()}>
                {data.moment.format('ddd, MMMM Do')}:{' '}
                <Link to={`/rotations/${linkText}`}>{data.rotation}</Link>
              </Segment>
            );
          })}
        </Segment.Group>
      </Segment.Group>
    );
  }
}

export default UpComing;
