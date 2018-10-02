import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { EditorState } from 'draft-js';
import _ from 'lodash';

import {
  PHYSICALEXAMMARKDOWN,
  ROSMARKDOWN,
  PMH,
  HPI,
} from './conferenceDefaults';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
import PresentationType from './PresentationType';

import ADD_QUESTION from '../../mutations/AddQuestionToCase';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';
import UPDATE_CASE_PRESENTATION from '../../mutations/UpdateCasePresentation';
import DELETE_CASE_PRESENTATION from '../../mutations/DeleteConference';
import DeleteQuestion from '../../mutations/DeleteQuestion';

class NoonConference extends Component {
  state = {
    id: '',
    summAssessment: '',
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
    embedPresentationSting: '',
    slideTextForSearch: '',
    presentationType: '',
    physicalExam: EditorState.createWithContent(
      stateFromMarkdown(PHYSICALEXAMMARKDOWN),
    ),
    ros: EditorState.createWithContent(stateFromMarkdown(ROSMARKDOWN)),
    hpi: EditorState.createWithContent(stateFromMarkdown(HPI)),
    pmh: EditorState.createWithContent(stateFromMarkdown(PMH)),
    _presentor: '',
    title: '',
    presentationDate: '',
    tags: [],
    initialUpdate: true,
  };

  updateConferenceInputState = (stateName, value) => {
    //console.log(stateName, value);

    this.setState({ [stateName]: value });
  };

  saveClicked = updateCasePresentation => {
    var ddx = this.state.ddx.map(theDdx => {
      return theDdx.name;
    });

    updateCasePresentation({
      variables: {
        id: this.state.id,
        summAssessment: this.state.summAssessment,
        ddx,
        wbc: this.state.wbc,
        hgb: this.state.hgb,
        plt: this.state.plt,
        Na: this.state.Na,
        K: this.state.K,
        Cl: this.state.Cl,
        HC02: this.state.HC02,
        BUN: this.state.BUN,
        Cr: this.state.Cr,
        Glu: this.state.Glu,
        AP: this.state.AP,
        ALT: this.state.ALT,
        AST: this.state.AST,
        Tbili: this.state.Tbili,
        additionalLabs: this.state.additionalLabs,
        imaging: this.state.imaging,
        embedPresentationSting: this.state.embedPresentationSting,
        slideTextForSearch: this.state.slideTextForSearch,
        presentationType: this.state.presentationType,
        physicalExam: stateToMarkdown(
          this.state.physicalExam.getCurrentContent(),
        ),
        ros: stateToMarkdown(this.state.ros.getCurrentContent()),
        hpi: stateToMarkdown(this.state.hpi.getCurrentContent()),
        pmh: stateToMarkdown(this.state.pmh.getCurrentContent()),
        _presentor: this.state._presentor,
        title: this.state.title,
        presentationDate: this.state.presentationDate,
        tags: this.state.tags,
        initialUpdate: true,
      },
    });
  };

  deleteClicked = deleteConference => {
    deleteConference({
      variables: {
        id: this.state.id,
      },
    });
  };

  setInitalState = data => {
    _.forOwn(
      data,
      function(value, key) {
        if (value !== null) {
          //console.log(key, value);
          if (
            key === 'physicalExam' ||
            key === 'ros' ||
            key === 'hpi' ||
            key === 'pmh'
          ) {
            this.setState({
              [key]: EditorState.createWithContent(stateFromMarkdown(value)),
            });
          } else if (key === 'ddx') {
            this.setState({
              [key]: value.map(name => {
                return { name, struckThrough: false };
              }),
            });
          } else if (key === '_presentor') {
            this.setState({ _presentor: value.id });
          } else {
            this.setState({ [key]: value });
          }
        }
      }.bind(this),
    );
    this.setState({ initialUpdate: false });
  };

  componentDidMount = () => {
    // set initial state
    this.setInitalState(this.props.presentationData);
  };

  render() {
    const { presentationData } = this.props;

    // set initial state with value from mutation

    const questionsForConference = presentationData.questions;
    const conferenceId = presentationData.id;

    return (
      <div>
        <Mutation
          mutation={UPDATE_CASE_PRESENTATION}
          refetchQueries={[
            {
              query: SELECTED_CASE_PRESENTATIONS,
              variables: { id: conferenceId },
            },
          ]}
          onCompleted={() => this.props.history.push('/Conference')}
        >
          {updateCasePresentation => (
            <div>
              <PresentationType
                updateConferenceInputState={(name, value) =>
                  this.updateConferenceInputState(name, value)
                }
                presentationType={this.state.presentationType}
              />
              {this.state.presentationType === 'case' && (
                <NoonConferenceInput
                  updateConferenceInputState={(name, value) =>
                    this.updateConferenceInputState(name, value)
                  }
                  editorState3={this.state.hpi}
                  editorState2={this.state.ros}
                  editorState4={this.state.pmh}
                  editorState={this.state.physicalExam}
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
              )}
              <Mutation
                mutation={ADD_QUESTION}
                refetchQueries={[
                  {
                    query: SELECTED_CASE_PRESENTATIONS,
                    variables: { id: conferenceId },
                  },
                ]}
              >
                {addQuestionToCase => (
                  <Mutation
                    mutation={DeleteQuestion}
                    refetchQueries={[
                      {
                        query: SELECTED_CASE_PRESENTATIONS,
                        variables: { id: conferenceId },
                      },
                    ]}
                  >
                    {deleteQuestion => (
                      <Questions
                        questions={questionsForConference}
                        caseId={conferenceId}
                        abilityToEdit={true}
                        addQuestionToCase={addQuestionToCase}
                        deleteQuestion={deleteQuestion}
                      />
                    )}
                  </Mutation>
                )}
              </Mutation>
              <Slides
                embedPresentationSting={this.state.embedPresentationSting}
                updateConferenceInputState={(name, value) =>
                  this.updateConferenceInputState(name, value)
                }
                slideTextForSearch={this.state.slideTextForSearch}
              />

              <Mutation
                mutation={DELETE_CASE_PRESENTATION}
                onCompleted={() => this.props.history.goBack()}
              >
                {deleteConference => (
                  <CatagorizationForSaving
                    updateConferenceInputState={(name, value) =>
                      this.updateConferenceInputState(name, value)
                    }
                    _presentor={this.state._presentor}
                    title={this.state.title}
                    presentationDate={this.state.presentationDate}
                    tags={this.state.tags}
                    saveClicked={() => this.saveClicked(updateCasePresentation)}
                    deleteClicked={() => this.deleteClicked(deleteConference)}
                  />
                )}
              </Mutation>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(NoonConference);
