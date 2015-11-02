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
				['img', 'http://www.asciitable.com/index/asciifull.gif']
			]
		}
	}, {
		tag: Intro,
		data: {
			views: [
				[0,2],
				[1,3]
			],
			contents: [
				['h2', '字符编码总结'],
				['h2', '字符转义总结'],
				['img', './encode.png'],
				['img', './escape.png']
			]
		}
	}, {
		tag: Encoding,
		data: {}
	}, {
		tag: Intro,
		data: {
			views: [
				[0,1,2],
			],
			contents: [
				['h2', '与安全的关系'],
				['li', '页面显示后台数据时，要用实体引用转义，防止字符串中包含script标签，插入页面后被执行，形成XSS。(Art-template, JSX)'],
				['li', '百分号转义和反斜杠转义本身并不直接跟某一类安全问题相关。']
			]
		}
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
