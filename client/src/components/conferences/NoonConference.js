import React, { Component } from 'react';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
//import NoonConferenceQR from './NoonConferenceQR';

class NoonConference extends Component {
  //        <NoonConferenceQR />

  render() {
    return (
      <div>
        <NoonConferenceInput />
        <Questions />
        <Slides />
        <CatagorizationForSaving />
      </div>
    );
  }
}

export default NoonConference;
