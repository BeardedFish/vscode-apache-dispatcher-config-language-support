"use strict";

const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpackBase = require("../webpack.config.common");
const path = require("path");

module.exports = webpackBase({
	context: path.join(__dirname),
	entry: {
		extension: "./src/server.ts",
	},
	output: {
		filename: "server.js",
		path: path.join(__dirname, "dist")
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "./tree-sitter-apache_dispatcher_config.wasm",
					to: "tree-sitter.wasm"
				},
				{
					from: "./documentation",
					to: "./documentation"
				}
			]
		})
	]
});
