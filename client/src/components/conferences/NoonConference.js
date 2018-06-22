import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Loader } from 'semantic-ui-react';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { stateToMarkdown } from 'draft-js-export-markdown';
import { EditorState } from 'draft-js';
import moment from 'moment';
import _ from 'lodash';

import { PHYSICALEXAMMARKDOWN, ROSMARKDOWN } from './conferenceDefaults';
import NoonConferenceInput from './NoonConferenceInput';
import Questions from './Questions';
import Slides from './NoonConferenceSlides';
import CatagorizationForSaving from './CategorizationForSaving';
import PresentationType from './PresentationType';

import SELECTED_CASE_PRESENTATIONS from '../../queries/SelectedCasePresentation';
import UPDATE_CASE_PRESENTATION from '../../mutations/UpdateCasePresentation';
import DELETE_CASE_PRESENTATION from '../../mutations/DeleteConference';

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
    hpi: EditorState.createWithContent(stateFromMarkdown(`45F p/w ...`)),
    pmh: EditorState.createWithContent(stateFromMarkdown(`PMH/PSH`)),
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

  saveClicked = updateCasePresentation => {
    var ddx = this.state.ddx.map(theDdx => {
      return theDdx.name;
    });

    console.log(this.state.slideTextForSearch);

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

            // set initial state with value from mutation
            if (this.state.initialUpdate) {
              _.forOwn(
                data.selectedCasePresentation,
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
                        [key]: EditorState.createWithContent(
                          stateFromMarkdown(value),
                        ),
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
            }

            return (
              <Mutation
                mutation={UPDATE_CASE_PRESENTATION}
                refetchQueries={[
                  {
                    query: SELECTED_CASE_PRESENTATIONS,
                    variables: { id: this.props.caseId },
                  },
                ]}
                onCompleted={() => this.props.history.goBack()}
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
                    <Questions
                      questions={this.state.questions}
                      caseId={data.selectedCasePresentation.id}
                      abilityToEdit={true}
                    />
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
                          saveClicked={() =>
                            this.saveClicked(updateCasePresentation)
                          }
                          deleteClicked={() =>
                            this.deleteClicked(deleteConference)
                          }
                        />
                      )}
                    </Mutation>
                  </div>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default NoonConference;
