import React, { Component } from 'react';
const ACTION_URL = "https://www.flonxchess.nl/wp-json/wp/v2/comments";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      formIsSubmitting: false,
      formSubmittedSuccessfully: false,
      formSubmittedFailed: false,
      formErrorMessage: null,
      textAreaValue: '',
    };
  }

  render() {
    const {
      formIsSubmitting,
      formSubmittedSuccessfully,
      formSubmittedFailed,
      formErrorMessage,
      textAreaValue,
    } = this.state;


    const submitButtonMarkup = formIsSubmitting ? (
      <input type="submit" value="Submitting comment..." disabled />
    ) : (
        <input className="btn btn-lg" type="submit" value="Plaats reactie!" />
      );

    const successMessageMarkup = formSubmittedSuccessfully ? (
      <div className="alert alert-primary" role="alert">
        Bedankt voor je reactie!
      </div>
    ) : null;

    const errorMessageMarkup = formSubmittedFailed && formSubmittedSuccessfully === false ? (
      <p>
        Sorry er is iets misgegaan, dit ligt waarschijnlijk aan de webbouwer...
      </p>
    ) : null;

    return (
      <>
      <div className="comments-form">
        <h4 id="CommentsHeading">Plaats reactie</h4>
        {successMessageMarkup}
        {errorMessageMarkup}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="hidden" id="postId" value={this.props.wpId} />
          <div>
            <label className="sr-only" htmlFor="name">Naam</label>
            <input id="name" type="text" placeholder="naam" required disabled={formIsSubmitting} />
          </div>
          <div>
            <label className="sr-only" htmlFor="comment">Reactie</label>
            <textarea
            placeholder="reactie"
              id="comment"
              rows="8"
              required
              disabled={formIsSubmitting}
              onChange={evt => {
                this.setState({ textAreaValue: evt.target.value });
              }}
              value={textAreaValue}
            />
          </div>
          <div>{submitButtonMarkup}</div>
        </form>
      </div>
      </>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();


// setTimeout(function(){ window.location.reload()}, 20 );

    const [postId, name, comment] = evt.target.elements;
    const sendData = JSON.stringify({
      post: postId.value,
      author_name: name.value,
      content: comment.value,
    });

    fetch(ACTION_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: sendData,
    })
      .then((response) => {
        if (response.ok === true) {
          this.setState({
            formIsSubmitting: false,
            formSubmittedSuccessfully: true,
            textAreaValue: '',
            update: true
          });
          window.location.reload();
        }

        return response.json();
      })
      .then((object) => {
        this.setState({
          formIsSubmitting: false,
          formSubmittedFailed: true,
          formErrorMessage: object.message,
        });
      })
      .catch(error => console.error('Error:', error));
  }
}

export default Comments;
