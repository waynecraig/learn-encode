require('../sass/intro.sass');
import React, { Component } from 'react';

export default class Intro extends Component {

	componentWillMount() {
		this.setState({cur: 0});
	}

	next(e) {
		let next = this.state.cur + 1;
		if (this.props.data.views[next]) {
			e.stopPropagation();
			this.setState({cur: next});
		} else {
			this.setState({cur: 0});
		}
	}

	render() {
		return (
			<div className='intro' onClick={e=>this.next(e)}>
				{this.props.data.views[this.state.cur].map((i, j)=>{
					let [Tag, content, className] = this.props.data.contents[i];
					if (Tag === 'img') {
						return <Tag key={j} className={className} src={content} />
					} else {
						return <Tag key={j} className={className}>{content}</Tag>
					}
				})}
			</div>
		)
	}

}
