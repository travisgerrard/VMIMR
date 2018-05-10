import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';

class NoonConferenceSlides extends Component {
  state = {
    showSlides: false,
  };

  iframe() {
    return {
      __html: `<iframe src="//www.slideshare.net/slideshow/embed_code/key/mUAigIVD8vwdGG" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/secret/mUAigIVD8vwdGG" title="Ibs" target="_blank"> </div>`,
    };
  }

  render() {
    return (
      <Container textAlign="center">
        {this.state.showSlides ? (
          <div dangerouslySetInnerHTML={this.iframe()} />
        ) : (
          <Button onClick={() => this.setState({ showSlides: true })}>
            Reveal Slides
          </Button>
        )}
      </Container>
    );
  }
}

export default NoonConferenceSlides;
