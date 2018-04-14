import React, { Component } from 'react';
import { Form, Input, TextArea, List, Grid } from 'semantic-ui-react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';

const PHYSICALEXAMMARKDOWN = `
  __Vitals__:
  __Tmax__: 98 __HR__: 70 __BP__: 120/80
  __...__
  __Phyiscal Exam__
  __Const__: A&Ox3, NAD, well developed
  __HEENT__: NC/AT, EOMI, MMM
  __Neck__: Supple, no JVD
  __Heart__: RRR, no MRG
  __Lungs__: CTAB
  __Abd__: Soft, NT/ND
  __Extremities__: No LE edema, +ve peripheral pulses
  __Neuro__: Cranial nerves grossly intact, MAE spontaneously
  __Skin__: Warm, dry with no observable rahes
  __Psych__: Mood and behabiour normal
`;

const ROSMARKDOWN = `
  __Constitutional:__
  __Skin__:
  __HEENT__:
  __Cardiac__:
  __Respiratory__:
  __GI__:
  __GU__:
  __MSK__:
  __Endo/Hem/Allergy__:
  __Neuro__:
  __Psych__:
`;

class NoonConference extends Component {
  state = {
    hpiValue: '',
    additionalText: '',
    medValue: '',
    medsArray: [],
    hxValue: '',
    hxArray: [],
    socialValue: '',
    socialArray: [],
    ddxValue: '',
    ddxArray: [],
    wbc: '',
    hgb: '',
    plt: '',
    Na: '',
    K: '',
    Cl: '',
    HC02: '',
    BUN: '',
    Cr: '',
    Glu: '',
    AP: '',
    ALT: '',
    AST: '',
    Tbili: '',
    editorState: EditorState.createWithContent(
      stateFromMarkdown(PHYSICALEXAMMARKDOWN),
    ),
    editorState2: EditorState.createWithContent(stateFromMarkdown(ROSMARKDOWN)),
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  editorOnChange2 = editorState2 => this.setState({ editorState2 });

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
            editorState={this.state.editorState2}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.editorOnChange2}
          />
        </div>
      </div>
    );
  };

  listFromArray = arrayName => {
    if (this.state[arrayName].length > 0) {
      return this.state[arrayName].map(item => {
        return <List.Item key={item}>{item}</List.Item>;
      });
    }
  };

  enterPressed = (arrayName, valueName) => e => {
    if (e.key === 'Enter') {
      var tempArray = this.state[arrayName].slice();
      tempArray.push(this.state[valueName]);
      this.setState({ [arrayName]: tempArray });
      this.setState({ [valueName]: '' });
    }
  };

  listCreator = (label, placeholder, arrayName, valueName, width) => {
    return (
      <div>
        <Form.Input
          label={label}
          placeholder={placeholder}
          value={this.state[valueName]}
          onChange={text =>
            this.setState({
              [valueName]: text.target.value,
            })
          }
          onKeyPress={this.enterPressed(arrayName, valueName)}
          style={{ width: width ? width : 128 }}
        />
        <List>{this.listFromArray(arrayName)}</List>
      </div>
    );
  };

  editorOnChange = editorState => this.setState({ editorState });

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
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.editorOnChange}
        />
      </div>
    );
  };

  labInput = inputValue => {
    return (
      <Input
        type="text"
        placeholder={inputValue}
        value={this.state[inputValue]}
        onChange={text =>
          this.setState({
            [inputValue]: text.target.value,
          })
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
          value={this.state.additionalLabs}
          onChange={text => console.log(text.target.value)}
          style={{ marginTop: 10 }}
        />
      </div>
    );
  };

  render() {
    return (
      <Form style={{ marginLeft: 25, marginRight: 25, marginTop: '4.5em' }}>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
              <Form.Field
                control={TextArea}
                label="HPI"
                placeholder="45F p/w ..."
                value={this.state.hpiValue}
                onChange={text =>
                  this.setState({
                    hpiValue: text.target.value,
                  })
                }
              />
              <div>{this.ROS()}</div>
              <Grid columns={3} style={{ marginTop: 10 }}>
                {this.listCreator(
                  'Meds',
                  'Xanax',
                  'medsArray',
                  'medValue',
                  110,
                )}
                {this.listCreator(
                  'Med/Surg hx',
                  'Diabetes',
                  'hxArray',
                  'hxValue',
                  110,
                )}
                {this.listCreator(
                  'Social',
                  'EtOH',
                  'socialArray',
                  'socialValue2',
                  110,
                )}
              </Grid>
            </Grid.Column>
            <Grid.Column>
              {this.physicalExam()}
              {this.labs()}
              <Form.Field
                control={TextArea}
                label="Imaging"
                placeholder="CXR..."
                value={this.state.imaging}
                onChange={text => console.log(text.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={TextArea}
                label="Summary assessment"
                placeholder="45M with ..."
                value={this.state.additionalText}
                onChange={text =>
                  this.setState({
                    additionalText: text.target.value,
                  })
                }
              />
              {this.listCreator(
                'Differential diagnosis',
                'ACS...',
                'ddxArray',
                'ddxValue',
                '225',
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
      </Form>
    );
  }
}

export default NoonConference;
