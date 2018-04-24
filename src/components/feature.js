import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentDidMount() {
		this.props.fetchMessage()
	}
	

	render() {
		return (
			<div>
				{this.props.message}
			</div>
		);
	}
}

const mstp = ({ auth }) => {
	return { message: auth.message}
}
export default connect(mstp, actions)(Feature);
