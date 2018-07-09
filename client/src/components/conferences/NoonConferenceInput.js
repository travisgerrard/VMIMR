import React, { Component } from 'react';
import { Form, Input, TextArea, Grid } from 'semantic-ui-react';
import { Editor, RichUtils } from 'draft-js';

import DragAndDropList from './DragAndDropList';

class NoonConference extends Component {
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  editorOnChange2 = editorState2 =>
    this.props.updateConferenceInputState(`ros`, editorState2);
  editorOnChange3 = editorState3 =>
    this.props.updateConferenceInputState(`hpi`, editorState3);
  editorOnChange4 = editorState4 =>
    this.props.updateConferenceInputState(`pmh`, editorState4);
  editorOnChange = editorState =>
    this.props.updateConferenceInputState(`physicalExam`, editorState);

  HPI = () => {
    return (
      <div>
        <div
          style={{
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderRadius: '0.28571429rem',
            padding: '0.67857143em 1em',
          }}
        >
          <Editor
            editorState={this.props.editorState3}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.editorOnChange3}
          />
        </div>
      </div>
    );
  };

  ROS = () => {
    return (
      <div>
        <label style={{ fontWeight: 'bold' }}>ROS</label>
        <div
          style={{
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderRadius: '0.28571429rem',
            padding: '0.67857143em 1em',
          }}
        >
          <Editor
            editorState={this.props.editorState2}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.editorOnChange2}
          />
        </div>
      </div>
    );
  };

  PMH = () => {
    return (
      <div>
        <label style={{ fontWeight: 'bold' }}>
          PMH / Meds / Social / Family
        </label>
        <div
          style={{
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderRadius: '0.28571429rem',
            padding: '0.67857143em 1em',
          }}
        >
          <Editor
            editorState={this.props.editorState4}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.editorOnChange4}
          />
        </div>
      </div>
    );
  };

  physicalExam = () => {
    // border: '1px solid rgba(34, 36, 38, 0.15)',
    // borderRadius: '0.28571429rem',
    // padding: '0.67857143em 1em',
    return (
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Editor
          editorState={this.props.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.editorOnChange}
        />
      </div>
    );
  };

  enterPressed = (arrayName, valueName) => e => {
    if (e.key === 'Enter') {
      var tempArray = this.props[arrayName].slice();
      tempArray.push({ name: this.props[valueName], struckThrough: false });
      this.props.updateConferenceInputState(arrayName, tempArray);
      this.props.updateConferenceInputState(valueName, '');
    }
  };

  listCreator = (label, placeholder, arrayName, valueName, width) => {
    return (
      <div>
        <Form.Input
          label={label}
          placeholder={placeholder}
          value={this.props[valueName]}
          onChange={text =>
            this.props.updateConferenceInputState(valueName, text.target.value)
          }
          onKeyPress={this.enterPressed(arrayName, valueName)}
          style={{ width: width ? width : 128 }}
        />
        {this.props[arrayName].length > 0 ? (
          <DragAndDropList
            data={this.props[arrayName]}
            arrayName={arrayName}
            width={width ? width : 128}
            updateListOrder={(items, arrayName) =>
              this.updateListOrder(items, arrayName)
            }
            strikeThroughItemAtIndex={(index, arrayName) =>
              this.strikeThroughItemAtIndex(index, arrayName)
            }
          />
        ) : (
          <div />
        )}
      </div>
    );
  };

  strikeThroughItemAtIndex = (index, arrayName) => {
    var tempArray = this.props[arrayName].slice();
    tempArray[index].struckThrough = !this.props[arrayName][index]
      .struckThrough;
    this.props.updateConferenceInputState(arrayName, tempArray);
  };

  updateListOrder = (items, arrayName) => {
    this.props.updateConferenceInputState(arrayName, items);
  };

  labInput = inputValue => {
    return (
      <Input
        type="text"
        placeholder={inputValue}
        value={this.props[inputValue]}
        onChange={text =>
          this.props.updateConferenceInputState(inputValue, text.target.value)
        }
        size="mini"
        style={{ width: 55 }}
      />
    );
  };

  labs = () => {
    return (
      <div>
        <label>CBC</label>
        <br />
        {this.labInput('wbc')} /
        {this.labInput('hgb')} /
        {this.labInput('plt')}
        <br />
        <label>BMP</label>
        <br />
        {this.labInput('Na')} |
        {this.labInput('Cl')} |
        {this.labInput('BUN')} /
        <br />
        {this.labInput('K')} |
        {this.labInput('HC02')} |
        {this.labInput('Cr')} \
        {this.labInput('Glu')}
        <br />
        <label>Hepatic Function Panel</label>
        <br />
        {this.labInput('AP')} /
        {this.labInput('ALT')} /
        {this.labInput('AST')} /
        {this.labInput('Tbili')}
        <Form.Field
          control={TextArea}
          placeholder="Additional Labs"
          value={this.props.additionalLabs}
          onChange={text =>
            this.props.updateConferenceInputState(
              `additionalLabs`,
              text.target.value,
            )
          }
          style={{ marginTop: 10 }}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <Form style={{ marginLeft: 25, marginRight: 25, marginTop: '4.5em' }}>
          <Grid columns={3}>
            <Grid.Row stretched>
              <Grid.Column>
                <div>{this.HPI()}</div>
              </Grid.Column>
              <Grid.Column>
                {this.physicalExam()}
                {this.labs()}
                <Form.Field
                  control={TextArea}
                  label="Imaging"
                  placeholder="CXR..."
                  value={this.props.imaging}
                  onChange={text =>
                    this.props.updateConferenceInputState(
                      `imaging`,
                      text.target.value,
                    )
                  }
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={TextArea}
                  label="Summary assessment"
                  placeholder="45M with ..."
                  value={this.props.summAssessment}
                  onChange={text =>
                    this.props.updateConferenceInputState(
                      `summAssessment`,
                      text.target.value,
                    )
                  }
                />
                {this.listCreator(
                  'Differential diagnosis',
                  'ACS...',
                  'ddx',
                  'ddxValue',
                  '225',
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
        </Form>
      </div>
    );
  }
}

export default NoonConference;
