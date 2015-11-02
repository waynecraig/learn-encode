require('../sass/demo.sass');
import React, { Component } from 'react';
import procedure from './procedure';

export default class Demo extends Component {

	componentWillMount() {
		this.next();
	}

	next() {
		this.setState(procedure.next().value);
	}

	render() {
		return (
			<div className='demo' onClick={()=>this.next()}>
				<this.state.tag data={this.state.data} />
			</div>
		)
	}

}
