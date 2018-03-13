import React, { Component } from 'react';
import QRCode from 'qrcode.react';

class NoonConferenceQR extends Component {
  render() {
    return (
      <div>
        <p>Hello!</p>
        <QRCode value="https://www.vmimr.com/noonConference" />
      </div>
    );
  }
}

export default NoonConferenceQR;
