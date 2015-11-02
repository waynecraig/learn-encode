import React, { Component } from 'react';

export default class Escaping extends Component {

	next() {
		console.log('escaping click');
	}

	render() {
		return (
			<div className='intro' onClick={this.next}>
				<h2 className='title'>escaping</h2>
			</div>
		)
	}

}
