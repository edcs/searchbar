var path = require("path");

module.exports = {
  entry: "./src/searchbar.js",
  output: {
    filename: "searchbar.min.js"
  },
	module: {
		loaders: [{ test: /\.handlebars$/, loader: "handlebars-loader" }]
	}
};
