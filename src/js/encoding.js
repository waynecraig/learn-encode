require('../sass/encoding.sass');
import React, { Component } from 'react';

export default class Encoding extends Component {

	componentWillMount() {
		this.setState({char: ''});
	}

	next(e) {
		if (e.target.className !== 'next') {
			e.stopPropagation();
		}
	}

	charChange(e) {
		let char = '';
		for (let c of e.target.value) {
			char = c;
		};
		this.setState({char: char});
	}

	mod(str, len, slen=len) {
		return ('0'.repeat((len - str.length % len) % len) + str).split('').reduce((pre,cur,i)=>{
			pre += cur;
			if ((i+1) % slen === 0) {
				pre += ' ';
			}
			return pre;
		}, '').trim();
	}

	getCodePointStrs() {
		return [[10,1,10],[2,8],[8,3],[16,2]].map(
			([d,n,m])=>this.mod(this.state.char.codePointAt(0).toString(d), n, m));
	}

	getUtf8Strs() {
		let s = encodeURI(this.state.char);
		if (s.includes('%')) {
			return [[2,8],[8,3],[16,2]].map(
				([d,n,m])=>this.mod(parseInt(s.replace(/%/g, ''), 16).toString(d), n));
		} else {
			return [[2,8],[8,3],[16,2]].map(
				([d,n,m])=>this.mod(s.charCodeAt(0).toString(d), n));
		}
	}

	getUtf16Strs() {
		return [[2,16,8],[8,3],[16,4,2]].map(
			([d,n,m])=>this.state.char.split('')
				.map(c=>this.mod(c.charCodeAt(0).toString(d), n, m))
				.join(' '));
	}

	getEscapeStrs() {
		let backslashStr, percentStr, entityrefStr = '';
		if (this.state.char.length === 1) {
			let codePointStrs = this.getCodePointStrs();
			backslashStr = '\\' + codePointStrs[2] + ', \\x' + codePointStrs[3];
		} else {
			backslashStr = this.getUtf16Strs()[2].split(' ').reduce((pre,cur,i)=>{
				if (i % 2 === 0) {
					pre += '\\u';
				}
				return pre + cur;
			}, '');
		}

		percentStr = encodeURI(this.state.char);
		if (!percentStr.includes('%')) {
			percentStr += ', %' + this.getUtf8Strs()[2];
		}

		let htmlSpe = new Map([
			[34,'&quot;'],
			[38,'&amp;'],
			[39,'&#39;'],
			[60,'&lt;'],
			[62,'&gt;']
		]).get(this.state.char.charCodeAt(0));
		if (htmlSpe) {
			entityrefStr += htmlSpe + ', ';
		}
		entityrefStr += '&#' + this.state.char.codePointAt(0) + ';';
		return [backslashStr, percentStr, entityrefStr];
	}

	render() {
		return (
			<div className='encoding' onClick={(e)=>this.next(e)}>
				<h2 className='title'>encoding inspection 演示</h2>
				<div className='content'>
					<div className='input'>
						<h3>请输入要检验的字符</h3>
						<input className='char' onChange={(e)=>this.charChange(e)} 
							value={this.state.char}/>
						<div>
							<p>示例：</p>
							<ul>
								<li key={0}>ascii字符：a, ^, 9</li>
								<li key={1}>简单字符：在, 测, 。</li>
								<li key={2}>复杂字符：𤭢, 𐐷, 𠮷</li>
							</ul>
						</div>
					</div>
					{()=>{
						if (this.state.char) {
							return (
								<div className='output'>
									<div key={0} className='row'>
										<div className='key col'>Unicode码点</div>
										<div className='key col'>
											{['十进制','二进制','八进制','十六进制'].map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
										<div className='value col'>
											{this.getCodePointStrs().map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
									</div>
									<div key={1} className='row'>
										<div className='key col'>UTF-8编码</div>
										<div className='key col'>
											{['二进制','八进制','十六进制'].map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
										<div className='value col'>
											{this.getUtf8Strs().map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
									</div>
									<div key={2} className='row'>
										<div className='key col'>UTF-16编码</div>
										<div className='key col'>
											{['二进制','八进制','十六进制'].map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
										<div className='value col'>
											{this.getUtf16Strs().map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
									</div>
									<div key={3} className='row'>
										<div className='key col'>字符转义</div>
										<div className='key col'>
											{['反斜杠转义','百分号转义','实体引用转义'].map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
										<div className='value col'>
											{this.getEscapeStrs().map(
												(s,i)=><p key={i}>{s}</p>)}
										</div>
									</div>
								</div>
							)
						}
					}()}
				</div>
				<span className='next'>下一页</span>
			</div>
		)
	}

}
