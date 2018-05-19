import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import schedule from './amionSchedule';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class UpComing extends Component {
  render() {
    var name = this.props.name;

    const today = new Date();
    const staticDay = today.getDate().toString();
    const staticMonth = (today.getMonth() + 1).toString();
    const yy = today
      .getFullYear()
      .toString()
      .substr(-2);
    const dateToCompare = `${staticDay}-${staticMonth}-${yy}`;

    const monthName = MONTH_NAMES[today.getMonth()];

    console.log(dateToCompare);

    //var previousDate = '';
    //var previousRotation = '';
    let arrayToDisplay = [];

    // Shorten to only next 5 days
    schedule.forEach(data => {
      if (data.Name === name) {
        var dateArray = data.Date.split('-');
        const [changingMonth, changingDay] = dateArray; //using destructuring
        if (changingMonth === staticMonth) {
          // If date is within 5 days
          if (
            parseInt(changingDay, 10) >= parseInt(staticDay, 10) &&
            parseInt(changingDay, 10) < parseInt(staticDay, 10) + 5
          ) {
            arrayToDisplay.push({
              day: changingDay,
              rotation: data.Rotation,
            });
          }
        }
      }
    });

    let shortenedArray = [];

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // take out duplicate rotations
    for (var i = 0; i < arrayToDisplay.length; i++) {
      if (arrayToDisplay[i + 1]) {
        if (
          arrayToDisplay[i + 1].rotation !== 'Eastgate, am' &&
          arrayToDisplay[i + 1].rotation !== 'Eastgate, pm'
        ) {
          if (arrayToDisplay[i].rotation === 'Eastgate, pm') {
            shortenedArray.push({
              day: arrayToDisplay[i].day,
              rotation: 'Eastgate',
            });
          } else {
            shortenedArray.push({
              day: arrayToDisplay[i].day,
              rotation: capitalizeFirstLetter(arrayToDisplay[i].rotation),
            });
          }
        }
      } else {
        if (arrayToDisplay[i].rotation !== 'Eastgate, pm') {
          shortenedArray.push({
            day: arrayToDisplay[i].day,
            rotation: capitalizeFirstLetter(arrayToDisplay[i].rotation),
          });
        }
      }
    }

    return (
      <Segment.Group style={{ paddingLeft: 15, backgroundColor: '#F5F5F5' }}>
        <Segment style={{ backgroundColor: '#F5F5F5' }}>
          <h4>Here's whats coming up on your schedule</h4>
        </Segment>
        <Segment.Group>
          {shortenedArray.map(data => {
            var linkText;
            if (data.rotation === 'Id') {
              linkText = 'Infectious%20Disease';
            } else if (data.rotation === 'Gastro') {
              linkText = 'Gastroenterology%20(GI)';
            } else if (data.rotation === 'Eastgate') {
              linkText = 'General%20Internal%20Medicine%20(GIM)';
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
                {monthName} {data.day}:{' '}
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
