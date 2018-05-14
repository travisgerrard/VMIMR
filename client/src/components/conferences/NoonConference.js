import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { EditorState } from 'draft-js';
import moment from 'moment';
import _ from 'lodash';

import { PHYSICALEXAMMARKDOWN, ROSMARKDOWN } from './conferenceDefaults';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
//import NoonConferenceQR from './NoonConferenceQR';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

class NoonConference extends Component {
  state = {
    id: '',
    summAssessment: '',
    medValue: '',
    meds: [],
    hxValue: '',
    medSurgHx: [],
    socialValue: '',
    social: [],
    ddxValue: '',
    ddx: [],
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
    additionalLabs: '',
    imaging: '',
    questions: [],
    physicalExam: EditorState.createWithContent(
      stateFromMarkdown(PHYSICALEXAMMARKDOWN),
    ),
    ros: EditorState.createWithContent(stateFromMarkdown(ROSMARKDOWN)),
    hpi: EditorState.createWithContent(stateFromMarkdown(`45F p/w ...`)),
    _presentor: '',
    title: '',
    presentationDate: moment().format('MM/DD/YY'),
    tags: [],
    initialUpdate: true,
  };

  updateConferenceInputState = (stateName, value) => {
    //console.log(stateName, value);

    this.setState({ [stateName]: value });
  };

  saveClicked = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Query
          query={SELECTED_CASE_PRESENTATIONS}
          variables={{ id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            // set intial state with value from mutation
            if (this.state.initialUpdate) {
              _.forOwn(
                data.selectedCasePresentation,
                function(value, key) {
                  if (value !== null) {
                    //console.log(key, value);
                    this.setState({ [key]: value });
                  }
                }.bind(this),
              );
              this.setState({ initialUpdate: false });
            }

            return (
              <div>
                <NoonConferenceInput
                  updateConferenceInputState={(name, value) =>
                    this.updateConferenceInputState(name, value)
                  }
                  editorState3={this.state.hpi}
                  editorState2={this.state.ros}
                  editorState={this.state.physicalExam}
                  medValue={this.state.medValue}
                  meds={this.state.meds}
                  medSurgHx={this.state.medSurgHx}
                  hxValue={this.state.hxValue}
                  social={this.state.social}
                  socialValue={this.state.socialValue}
                  ddx={this.state.ddx}
                  ddxValue={this.state.ddxValue}
                  imaging={this.state.imaging}
                  summAssessment={this.state.summAssessment}
                  wbc={this.state.wbc}
                  hgb={this.state.hgb}
                  plt={this.state.plt}
                  Na={this.state.Na}
                  K={this.state.K}
                  Cl={this.state.Cl}
                  HC02={this.state.HC02}
                  BUN={this.state.BUN}
                  Cr={this.state.Cr}
                  Glu={this.state.Glu}
                  AP={this.state.AP}
                  ALT={this.state.ALT}
                  AST={this.state.AST}
                  Tbili={this.state.Tbili}
                  additionalLabs={this.state.additionalLabs}
                />
                <Questions
                  questions={this.state.questions}
                  caseId={data.selectedCasePresentation.id}
                />
                <Slides />
                <CatagorizationForSaving
                  updateConferenceInputState={(name, value) =>
                    this.updateConferenceInputState(name, value)
                  }
                  _presentor={this.state._presentor}
                  title={this.state.title}
                  presentationDate={this.state.presentationDate}
                  tags={this.state.tags}
                  saveClicked={() => this.saveClicked()}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default NoonConference;
