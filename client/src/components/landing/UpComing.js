import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import schedule from './amionSchedule';
import { link } from 'fs';

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
          }
          if (
            arrayToDisplay[i + 1].rotation !== 'Vm u.village, am' &&
            arrayToDisplay[i + 1].rotation !== 'Vm u.village, pm'
          ) {
            if (arrayToDisplay[i].rotation === 'Vm u.village, pm') {
              shortenedArray.push({
                day: arrayToDisplay[i].day,
                rotation: 'Vm u.village',
              });
            } else {
              shortenedArray.push({
                day: arrayToDisplay[i].day,
                rotation: capitalizeFirstLetter(arrayToDisplay[i].rotation),
              });
            }
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
          <h4>Here's whats coming up on your schedule Dr. {this.props.name}</h4>
        </Segment>
        <Segment.Group>
          {shortenedArray.map(data => {
            var linkText;
            if (data.rotation === 'Id') {
              linkText = 'Infectious%20Disease';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>Infectious Disease</Link>
                </Segment>
              );
            } else if (data.rotation === 'Gastro') {
              linkText = 'Gastroenterology%20(GI)';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Gastroenterology (GI)
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Ent') {
              linkText = 'Ears%20Nose%20Throat%20(ENT)';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Ears Nose Throat (ENT)
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Eastgate') {
              linkText = 'General%20Internal%20Medicine%20(GIM)';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{data.rotation}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Card') {
              linkText = 'Cardiology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Endo') {
              linkText = 'Endocrinology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Sys-base') {
              linkText = 'Systems%20based%20practice';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Systems based practice
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Rheum') {
              linkText = 'Rheumatology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ip-psych') {
              linkText = 'Psychiatry%20-%20Inpatient';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Psychiatry - Inpatient
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Hyperbaric') {
              linkText = 'Hyperbarics';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Pulm') {
              linkText = 'Pulmonology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Neph') {
              linkText = 'Nephrology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>Nephrology</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ccu') {
              linkText = 'CCU';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>CCU</Link>
                </Segment>
              );
            } else if (data.rotation === 'Allergy') {
              linkText = 'Allergy%20and%20immunology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Allergy and immunology
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Derm') {
              linkText = 'Dermatology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Palliative') {
              linkText = 'Palliative%20Care';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>Palliative Care</Link>
                </Segment>
              );
            } else if (data.rotation === 'Hem onc') {
              linkText = 'Hematology%20and%20Oncology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>
                    Hematology and Oncology
                  </Link>
                </Segment>
              );
            } else if (data.rotation === 'Neuro') {
              linkText = 'Neurology';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
                  <Link to={`/rotations/${linkText}`}>{linkText}</Link>
                </Segment>
              );
            } else if (data.rotation === 'Ed') {
              linkText = 'Emergency%20Department';
              return (
                <Segment key={Math.random()}>
                  {monthName} {data.day}:{' '}
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
