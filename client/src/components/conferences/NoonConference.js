import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { Editor, EditorState, RichUtils } from 'draft-js';
import moment from 'moment';

import { PHYSICALEXAMMARKDOWN, ROSMARKDOWN } from './conferenceDefaults';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
//import NoonConferenceQR from './NoonConferenceQR';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';

class NoonConference extends Component {
  state = {
    hpiValue: '',
    sumAsses: '',
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
    additionalLabs: '',
    imaging: '',
    editorState: EditorState.createWithContent(
      stateFromMarkdown(PHYSICALEXAMMARKDOWN),
    ),
    editorState2: EditorState.createWithContent(stateFromMarkdown(ROSMARKDOWN)),
    editorState3: EditorState.createWithContent(
      stateFromMarkdown(`45F p/w ...`),
    ),
    presenter: '',
    title: '',
    date: moment().format('MM/DD/YY'),
    tags: [],
  };

  updateConferenceInputState = (stateName, value) => {
    this.setState({ [stateName]: value });
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

            console.log(data);

            return (
              <div>
                <NoonConferenceInput
                  updateConferenceInputState={(name, value) =>
                    this.updateConferenceInputState(name, value)
                  }
                  editorState3={this.state.editorState3}
                  editorState2={this.state.editorState2}
                  editorState={this.state.editorState}
                  medValue={this.state.medValue}
                  medsArray={this.state.medsArray}
                  hxArray={this.state.hxArray}
                  hxValue={this.state.hxValue}
                  socialArray={this.state.socialArray}
                  socialValue={this.state.socialValue}
                  ddxArray={this.state.ddxArray}
                  ddxValue={this.state.ddxValue}
                  imaging={this.state.imaging}
                  sumAsses={this.state.sumAsses}
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
                <Questions />
                <Slides />
                <CatagorizationForSaving
                  updateConferenceInputState={(name, value) =>
                    this.updateConferenceInputState(name, value)
                  }
                  presenter={this.state.presenter}
                  title={this.state.title}
                  date={this.state.date}
                  tags={this.state.tags}
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
