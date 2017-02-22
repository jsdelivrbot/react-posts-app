import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'  // not necessary due to refactor
import { fetchPosts } from '../actions/index'

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>list of blogs</div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }
//  ^^^ this code is refactored into the below line

export default connect(null, { fetchPosts })(PostsIndex);  // this gives us access to this.props
