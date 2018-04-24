import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    };
    componentWillMount() {
      if (!this.props.auth) {
        this.context.router.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
