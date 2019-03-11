import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

class CommentOwnerEditable extends React.Component {

  static propTypes = {
    comment: PropTypes.object,
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { editing: false }
  };

  toggleEditing = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  saveComment = () => {
    let { comment, commentUpdate } = this.props;
    let newContent = document.getElementById("commentContent").value;
    let values = {
      content: newContent
    }
    commentUpdate(comment.id, values, "nowhere");
    this.toggleEditing();
  }

  render() {
    let { comment, currentUser, commentDelete } = this.props;
    let { editing } = this.state;

    // console.log(">>>>>", comment, currentUser)

    if (currentUser.id === comment.author.id) {
      if (editing) {
        return (
          <li className="list-group-item d-flex flex-column align-items-stretch">
            <div className="form-group" style={ { flex: 1 } }>
              <input id="commentContent" type="text" className="form-control align-self-stretch" defaultValue={comment.content} />
            </div>
            <div className="align-self-end">
              <button className="btn btn-success btn-sm" onClick={this.saveComment}>save</button>
              <button className="btn btn-danger btn-sm" onClick={this.toggleEditing}>cancel</button>
            </div>
          </li>
        )
      } else {
        return (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            You said: "{comment.content}"
            <div>
              <button className="btn btn-primary btn-sm" onClick={this.toggleEditing}>edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => commentDelete(comment.id, "nowhere")}>delete</button>
            </div>
          </li>
        )
      }
    } else {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {comment.author.username} says: "{comment.content}"
        </li>
      )
    }

  }
};

export default CommentOwnerEditable;
