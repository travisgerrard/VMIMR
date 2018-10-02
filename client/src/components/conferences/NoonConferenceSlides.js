import React, { Component } from 'react';
import { Container, Segment, Form } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

class NoonConferenceSlides extends Component {
  // <iframe src="//www.slideshare.net/slideshow/embed_code/key/mUAigIVD8vwdGG" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/secret/mUAigIVD8vwdGG" title="Ibs" target="_blank"></div>

  iframe = () => {
    return {
      __html: this.props.embedPresentationSting,
    };
  };

  render() {
    return (
      <Container>
        <Segment>
          <div>
            <span style={{ whiteSpace: 'pre-wrap' }}>
              <ReactMarkdown
                source={this.props.embedPresentationSting}
                escapeHtml={false}
              />
            </span>
          </div>

          <label>{`Link to slides `}</label>
          <Form>
            <Form.TextArea
              value={this.props.embedPresentationSting}
              onChange={e =>
                this.props.updateConferenceInputState(
                  'embedPresentationSting',
                  e.target.value,
                )
              }
            />
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default NoonConferenceSlides;
