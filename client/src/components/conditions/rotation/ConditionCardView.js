import React, { Component } from 'react';

class ConditionCardView extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">UGIB</span>
              <p>Tags: CCU</p>
              <div className="row" style={{ margin: '0', border: '0' }}>
                <div className="col">
                  <div
                    className="card-panel teal"
                    style={{ marginBottom: '0' }}
                  >
                    <p className="white-text">Cr:BUN 1:30 at least</p>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card-panel teal"
                    style={{ marginBottom: '0' }}
                  >
                    <p className="white-text">Causes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <a href="#">Edit</a>
              <a href="#" className="right red-text">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ConditionCardView;
