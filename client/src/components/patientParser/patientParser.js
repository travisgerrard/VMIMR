import React, { Component } from 'react';
import {
  Container,
  Button,
  Form,
  TextArea,
  Image,
  Segment,
} from 'semantic-ui-react';

import './patientParser.css';

const patientParserOrderImage = `https://res.cloudinary.com/dehixvgdv/image/upload/v1531945878/VMIMR/PatientParserOrder.png`;
const patientParserOrderSetup = `https://res.cloudinary.com/dehixvgdv/image/upload/v1531945890/VMIMR/PatientParserOrderSetup.png`;

const dailyToDos = [
  'Consults',
  'Andon - ☐ VTE/Glucose',
  'MAR 48: ☐ IV meds',
  'AM Labs',
  'Disharge/Dispo',
  'Learning',
];
const followUps = [
  '___________________',
  '___________________',
  '___________________',
  '___________________',
  '___________________',
  '___________________',
];
const cbcAndBmr = [
  '       \\____/',
  '       /        \\',

  ' ',

  '___|____|___/',
  '      |        |      \\',
  ' ',
];

const fontStyle = {
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'lighter',
};

class patientParser extends Component {
  state = {
    stringToParse: '',
  };

  makeUL = array => {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
      // Create the list item:
      var item = document.createElement('li');

      // Set its contents:
      item.appendChild(document.createTextNode(array[i]));

      // Add it to the list:
      list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
  };

  printDiv = () => {
    // var printContents = document.getElementById('printArea').innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
    var mywindow = window.open('', 'PRINT');

    mywindow.document.write('<html><head><title>my div</title>');
    mywindow.document.write(
      `<style>
      body {
        font-weight: lighter;
      }
      
      #patientTotalInfo {
        width: 100%;
        text-align: left;
      }
      
      #patientInfo {
        width: 180px;
        /*float: left;*/
        display: inline-block;
        zoom: 1;
      }
      
      #dailyTodo {
        width: 225px;
        /*font-size: 12px;*/
        /*float: left;*/
        display: inline-block;
        zoom: 1;
      }
      
      #dailyTodo li:before {
        content: "\\2610";
        margin-right: 5px;
      }
      
      #followUps {
        width: 150px;
        /*float: left;*/
        display: inline-block;
        zoom: 1;
      }
      
      #followUps li:before {
        content: "\\2610";
        margin-right: 5px;
      }
      
      #cbcAndBmr {
        width: 140px;
        /*float: left;*/
        display: inline-block;
        zoom: 1;
      }
      
      ul {
        list-style: none;
      }
      /*
      li:before {
        content: "\\2610";
        margin-right: 5px;
      }
      */
      
      #nameText {
        font-weight: bold;
      }
      </style>`,
    );
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById('printArea').innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  };

  parseText = beginString => {
    document.getElementById('printArea').innerHTML = '';

    beginString = beginString.trim();
    var choppedStringOne = beginString.split('		');
    for (let stringOne of choppedStringOne) {
      //Breaks entered text into patient specific chunks
      var choppedStringTwo = stringOne.split('	');
      var i = 0;
      var elementOne = document.createElement('div');
      elementOne.id = 'patientTotalInfo';
      var elementTwo = document.createElement('div');
      elementTwo.id = 'patientInfo';
      elementOne.appendChild(elementTwo);
      let elementThree;
      for (let stringTwo of choppedStringTwo) {
        //Breaks a patient chunck into it's specific parts
        switch (i) {
          case 0:
            var nameText = `${stringTwo}`;
            //console.log(nameText);
            elementThree = document.createElement('div');
            elementThree.id = 'nameText';
            elementThree.appendChild(document.createTextNode(nameText));
            elementTwo.appendChild(elementThree);
            break;
          case 1:
            var roomText = `Room ${stringTwo}        ☐`;
            //console.log(roomText);
            elementThree = document.createElement('div');
            elementThree.style.whiteSpace = 'pre';
            elementThree.appendChild(document.createTextNode(roomText));
            elementTwo.appendChild(elementThree);
            break;
          case 2:
            var ageText = `Age: ${stringTwo}`;
            //console.log(ageText);
            elementThree = document.createElement('div');
            elementThree.appendChild(document.createTextNode(ageText));
            elementTwo.appendChild(elementThree);
            break;
          case 3:
            var genderText = `Gender: ${stringTwo}`;
            //console.log(genderText);
            elementThree = document.createElement('div');
            elementThree.appendChild(document.createTextNode(genderText));
            elementTwo.appendChild(elementThree);
            break;
          case 4:
            var mrnText = `MRN: ${stringTwo}            I/O:`;
            //console.log(mrnText);
            elementThree = document.createElement('div');
            elementThree.style.whiteSpace = 'pre';
            elementThree.appendChild(document.createTextNode(mrnText));
            elementTwo.appendChild(elementThree);
            break;
          case 5:
            var losText = `LOS: ${stringTwo}`;
            //console.log(losText);
            elementThree = document.createElement('div');
            elementThree.appendChild(document.createTextNode(losText));
            elementTwo.appendChild(elementThree);
            break;
          case 6:
            // Add rounding order
            var raText = `Rounding order _____`;
            var elementRoundingOrder = document.createElement('div');
            elementRoundingOrder.appendChild(document.createTextNode(raText));
            elementTwo.appendChild(elementRoundingOrder);
            break;
          default:
        }

        document.getElementById('printArea').appendChild(elementOne);
        i++;
      }

      // create and add daily cbc and bmr...
      var elementSix = document.createElement('div');
      elementSix.id = 'cbcAndBmr';
      elementSix.style.whiteSpace = 'pre';
      elementSix.appendChild(this.makeUL(cbcAndBmr));
      elementOne.appendChild(elementSix);

      // create and add the daily todos
      var elementFour = document.createElement('div');
      elementFour.id = 'dailyTodo';
      elementFour.appendChild(this.makeUL(dailyToDos));
      elementOne.appendChild(elementFour);

      // creat and add some blanks for followups
      var elementFive = document.createElement('div');
      elementFive.id = 'followUps';
      elementFive.appendChild(this.makeUL(followUps));
      elementOne.appendChild(elementFive);
    }
  };

  render() {
    return (
      <Container>
        <h1
          style={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 'lighter',
            marginTop: 10,
          }}
        >
          List Formatter
        </h1>
        <p>NOTE: Not working in Internet Explorer</p>
        <Form>
          <TextArea
            rows={4}
            cols={50}
            value={this.state.stringToParse}
            onChange={e => {
              this.setState({ stringToParse: e.target.value });
              this.parseText(e.target.value);
            }}
            placeholder="Paste your list from cerner into here. The order will mimic what you have in Cerner. Having trouble? Try reloading the page"
          />
        </Form>

        <br />

        {this.state.stringToParse && (
          <Button
            type="button"
            id="submitButton"
            className="noprint"
            onClick={() => this.printDiv()}
            primary
          >
            Print
          </Button>
        )}
        <Segment style={fontStyle}>
          <div id="printArea">
            This is where your formatted list will show up after pasting it
            above
          </div>
        </Segment>

        <Segment
          style={{
            marginTop: 10,
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 'lighter',
          }}
          textAlign="center"
        >
          <h3 style={{ marginTop: 5 }}>
            IMPORTANT: In order to work, columns need to be arranged if the
            following order:
          </h3>
          <h3>
            New Results (Clipboard) / Name / Location / Age / Sex / MRN / Length
            of Stay / Admitted
          </h3>
          <Image.Group>
            <Image src={patientParserOrderImage} size="large" />
            <br />
            <Image src={patientParserOrderSetup} size="medium" />
          </Image.Group>
        </Segment>
        <Segment
          style={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 'lighter',
          }}
        >
          <h2>Disclaimer</h2>
          <p>
            The information entered above is only manipulated locally on your
            device (i.e. never sent over the internet in any way) and is erased
            when the page is closed or re-loaded. It is your responsibility to
            close this window after use.
          </p>
        </Segment>
      </Container>
    );
  }
}

export default patientParser;
