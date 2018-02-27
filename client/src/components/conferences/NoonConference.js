import React, { Component } from 'react';
import { Form, Input, TextArea, List, Grid } from 'semantic-ui-react';
import { Editor, EditorState } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import _ from 'lodash';

const PHYSICALEXAMMARKDOWN = `
  __Vitals__:  
  __Temp__: 98 __HR__: 70 __BP__: 120/80    
  .  
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

class NoonConference extends Component {
  state = {
    ROS: [
      {
        id: 0,
        system: 'CONSTITUTIONAL',
        sx: 'Fevers',
        qualifier: ''
      },
      {
        id: 1,
        system: 'CONSTITUTIONAL',
        sx: 'Chills',
        qualifier: ''
      },
      { id: 2, system: 'CONSTITUTIONAL', sx: 'Weight loss', qualifier: '' },
      {
        id: 3,
        system: 'CONSTITUTIONAL',
        sx: 'Malaise/Fatigue',
        qualifier: ''
      },
      { id: 4, system: 'CONSTITUTIONAL', sx: 'Diaphoresis', qualifier: '' },
      { id: 5, system: 'CONSTITUTIONAL', sx: 'Weakness', qualifier: '' },
      { id: 6, system: 'SKIN', sx: 'Rash', qualifier: '' },
      { id: 7, system: 'SKIN', sx: 'Itching', qualifier: '' },
      { id: 8, system: 'HEENT', sx: 'Vision changes', qualifier: '' },
      { id: 9, system: 'HEENT', sx: 'Eye pain', qualifier: '' },
      { id: 10, system: 'HEENT', sx: 'Hearing changes', qualifier: '' },
      { id: 11, system: 'HEENT', sx: 'Ear pain', qualifier: '' },
      { id: 12, system: 'HEENT', sx: 'Nosebleeds', qualifier: '' },
      { id: 13, system: 'HEENT', sx: 'Congestion', qualifier: '' },
      { id: 14, system: 'HEENT', sx: 'Sinus pain', qualifier: '' },
      { id: 15, system: 'HEENT', sx: 'Sore throat', qualifier: '' },
      { id: 16, system: 'CARDIAC', sx: 'Chest pain', qualifier: '' },
      { id: 17, system: 'CARDIAC', sx: 'Palpitations', qualifier: '' },
      { id: 18, system: 'CARDIAC', sx: 'Orthopnea', qualifier: '' },
      { id: 19, system: 'CARDIAC', sx: 'Claudication', qualifier: '' },
      { id: 20, system: 'CARDIAC', sx: 'Leg swelling', qualifier: '' },
      { id: 21, system: 'CARDIAC', sx: 'PND', qualifier: '' },
      { id: 22, system: 'RESPIRATORY', sx: 'Cough', qualifier: '' },
      { id: 23, system: 'RESPIRATORY', sx: 'Hemoptysis', qualifier: '' },
      { id: 24, system: 'RESPIRATORY', sx: 'Sputum production', qualifier: '' },
      {
        id: 25,
        system: 'RESPIRATORY',
        sx: 'Shortness of breath',
        qualifier: ''
      },
      { id: 26, system: 'RESPIRATORY', sx: 'Wheezing', qualifier: '' },
      { id: 27, system: 'GI', sx: 'Heartburn', qualifier: '' },
      { id: 28, system: 'GI', sx: 'Nausea', qualifier: '' },
      { id: 29, system: 'GI', sx: 'Vomiting', qualifier: '' },
      { id: 30, system: 'GI', sx: 'Abdominal pain', qualifier: '' },
      { id: 31, system: 'GI', sx: 'Diarrhea', qualifier: '' },
      { id: 32, system: 'GI', sx: 'Constipation', qualifier: '' },
      { id: 33, system: 'GI', sx: 'Blood in stool', qualifier: '' },
      { id: 34, system: 'GI', sx: 'Melena', qualifier: '' },
      { id: 35, system: 'GU', sx: 'Dysuria', qualifier: '' },
      { id: 36, system: 'GU', sx: 'Urgency', qualifier: '' },
      { id: 37, system: 'GU', sx: 'Frequency', qualifier: '' },
      { id: 38, system: 'GU', sx: 'Hematuria', qualifier: '' },
      { id: 39, system: 'GU', sx: 'Flank pain', qualifier: '' },
      { id: 40, system: 'MSK', sx: 'Myalgias', qualifier: '' },
      { id: 41, system: 'MSK', sx: 'Neck pain', qualifier: '' },
      { id: 42, system: 'MSK', sx: 'Back pain', qualifier: '' },
      { id: 43, system: 'MSK', sx: 'Joint pain', qualifier: '' },
      { id: 44, system: 'MSK', sx: 'Falls', qualifier: '' },
      {
        id: 45,
        system: 'ENDO/HEME/ALLERGY',
        sx: 'Easy bruise/bleed',
        qualifier: ''
      },
      {
        id: 46,
        system: 'ENDO/HEME/ALLERGY',
        sx: 'Env allergies',
        qualifier: ''
      },
      { id: 47, system: 'ENDO/HEME/ALLERGY', sx: 'Polydipsia', qualifier: '' },
      { id: 48, system: 'NEUROLOGICAL', sx: 'Dizziness', qualifier: '' },
      { id: 49, system: 'NEUROLOGICAL', sx: 'Headaches', qualifier: '' },
      { id: 50, system: 'NEUROLOGICAL', sx: 'Tingling', qualifier: '' },
      { id: 51, system: 'NEUROLOGICAL', sx: 'Tremor', qualifier: '' },
      { id: 52, system: 'NEUROLOGICAL', sx: 'Sensory change', qualifier: '' },
      { id: 53, system: 'NEUROLOGICAL', sx: 'Speech change', qualifier: '' },
      { id: 54, system: 'NEUROLOGICAL', sx: 'Focal weakness', qualifier: '' },
      { id: 55, system: 'NEUROLOGICAL', sx: 'Seizure', qualifier: '' },
      { id: 56, system: 'NEUROLOGICAL', sx: 'LOC', qualifier: '' },
      { id: 57, system: 'PSYCHIATRIC', sx: 'Depression', qualifier: '' },
      { id: 58, system: 'PSYCHIATRIC', sx: 'Suicidal ideas', qualifier: '' },
      { id: 59, system: 'PSYCHIATRIC', sx: 'Substance abuse', qualifier: '' },
      { id: 60, system: 'PSYCHIATRIC', sx: 'Hallucinations', qualifier: '' },
      { id: 61, system: 'PSYCHIATRIC', sx: 'Nervous/Anxious', qualifier: '' },
      { id: 62, system: 'PSYCHIATRIC', sx: 'Insomnia', qualifier: '' },
      { id: 63, system: 'PSYCHIATRIC', sx: 'Momory loss', qualifier: '' }
    ],
    hpiValue: '',
    medValue: '',
    medsArray: [],
    hxValue: '',
    hxArray: [],
    socialValue: '',
    socialArray: [],
    ddxValue: '',
    ddxArray: '',
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
    editorState: EditorState.createWithContent(
      stateFromMarkdown(PHYSICALEXAMMARKDOWN)
    )
  };

  clickedROS = symptom => {
    var { id, qualifier } = symptom;
    let ROS = this.state.ROS;
    let copyOfSymptom = { ...this.state.ROS[symptom.id] };
    if (qualifier === '') {
      qualifier = '+';
    } else if (qualifier === '+') {
      qualifier = '-';
    } else if (qualifier === '-') {
      qualifier = '';
    }
    copyOfSymptom.qualifier = qualifier;
    ROS = { ...ROS, [id]: copyOfSymptom };
    this.setState({
      ROS
    });
  };

  ROS = () => {
    let system = '';
    return _.map(this.state.ROS, symptom => {
      const showSystem = system === symptom.system ? false : true;
      if (system === '' || system !== symptom.system) {
        system = symptom.system;
      }
      const firstItem = symptom.sx === 'Fevers';

      return (
        <div key={symptom.id} style={{ display: 'inline' }}>
          {firstItem ? <label style={{ fontWeight: 'bold' }}>ROS</label> : ''}
          {showSystem || firstItem ? <br /> : ''}
          {showSystem ? (
            <span
              style={{
                cursor: 'default',
                userSelect: 'none',
                fontWeight: 'bold'
              }}
            >{`${symptom.system}: `}</span>
          ) : (
            ''
          )}
          <span
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={() => this.clickedROS(symptom)}
          >
            {symptom.sx}
            {symptom.qualifier},{' '}
          </span>
        </div>
      );
    });
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
              [valueName]: text.target.value
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
          marginBottom: 10
        }}
      >
        <Editor
          editorState={this.state.editorState}
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
            [inputValue]: text.target.value
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
        {this.labInput('Na')} /
        {this.labInput('K')} /
        {this.labInput('Cl')} /
        {this.labInput('HC02')} /
        {this.labInput('BUN')} /
        {this.labInput('Cr')} /
        {this.labInput('Glu')}
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
                    hpiValue: text.target.value
                  })
                }
              />
              <div>{this.ROS()}</div>
              <Grid columns={3} style={{ marginTop: 10 }}>
                {this.listCreator('Meds', 'Xanax', 'medsArray', 'medValue')}
                {this.listCreator(
                  'Medical/Surgical hx',
                  'Diabetes',
                  'hxArray',
                  'hxValue'
                )}
                {this.listCreator(
                  'Social',
                  'EtOH',
                  'socialArray',
                  'socialValue2'
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
              {this.listCreator(
                'Differential diagnosis',
                'ACS',
                'ddxArray',
                'ddxValue',
                '225'
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default NoonConference;
