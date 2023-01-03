const path = require("path");

module.exports = {
	mode: "development",
	target: ["web", "es5"],
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: [path.resolve(__dirname, "src")],
				use: "ts-loader",
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		publicPath: "./dist",
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
