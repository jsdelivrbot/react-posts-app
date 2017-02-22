import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';


class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post create therefore navigate
        this.context.router.push('/')
       })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a new post</h3>

          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
            <label>Title</label>
            <input type="text" className="form-control" {...title} />
            <div className="text-help">
              {title.touched ? title.error : ''}
            </div>
          </div>

          <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }`}>
            <label>Categories</label>
            <input type="text" className="form-control" {...categories} />
            <div className="text-help">
              {categories.touched ? categories.error : ''}
            </div>
          </div>

          <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
            <label>Content</label>
            <textarea className="form-control" {...content} />
            <div className="text-help">
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>

        </form>
      </div>
    );
  }
}

function validate(values) {
  // values == value in the fields e.g. values.title

  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

// connect: first argument is mapStateToProps second is mapDispatchToProps
// reduxForm: first is config 2nd and 3rd are as above

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
