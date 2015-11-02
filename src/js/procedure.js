import Intro from './intro';
import Encoding from './encoding';

const steps = [{ tag: Intro,
		data: {
			views: [
				[0,1,2]
			],
			contents: [
				['h2', '字符编码与转义'],
				['cite', 'craigwu'],
				['cite', '2015-11-02']
			]
		}
	}, {
		tag: Intro,
		data: {
			views: [
				[0],
				[0,1],
				[0,1,2],
				[0,1,2,3]
			],
			contents: [
				['h2', '问题'],
				['li', 'String的length函数返回的数字是什么意思?'],
				['li', 'UTF-8和UTF-16有什么区别?'],
				['li', '我们经常用到的字符转义有哪几种？']
			]
		}
	}, {
		tag: Intro,
		data: {
			views: [
				[0,4]
			],
			contents: [
				['h2', 'ASCII - 最基本的字符编码'],
				['li', 'ASCII: 单字节，只定义了0-127'],
				['li', 'Unicode: 试图对所有字符做统一编码, utf-8, 可变长'],
				['li', 'gb-2312: 用于对简体中文的编码'],
				['img', 'http://www.asciitable.com/index/asciifull.gif', 'asciiimg']
			]
		}
	}, {
		tag: Encoding,
		data: {}
	}, {
		tag: Intro,
		data: {
			views: [[0]],
			contents: [
				['h2', '谢谢']
			]
		}
}];

let cur = 0;

function* Procedure() {
	while(true) {
		if (!steps[cur]) {
			cur = 0;
		}
		let reverse = yield steps[cur];
		if (reverse) {
			cur--;
		} else {
			cur++;
		}
	}
};

const procedure = Procedure();
export default procedure;
