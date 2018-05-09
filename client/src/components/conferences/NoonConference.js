import React, { Component } from 'react';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';

//import NoonConferenceQR from './NoonConferenceQR';

class NoonConference extends Component {
  //        <NoonConferenceQR />

  render() {
    return (
      <div>
        <NoonConferenceInput />
        <Questions />
        <Slides />
      </div>
    );
  }
}

export default NoonConference;
