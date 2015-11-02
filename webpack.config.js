module.exports = {
    context: __dirname + "/src/js",
    entry: "./main",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{ test: /\.sass$/, exclude: /node_modules/, loader: "style!css!sass?indentedSyntax"}
		]
	}
}
