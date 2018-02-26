

module.exports = {
  entry: ['./src/index.js'], // entry point
  output: {
    path:  __dirname + '/build',
    filename: 'bundle.js'
  }, // output file and path
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            plugins: ['transform-decorators-legacy' ],
          }
        },
      }
    ]
  },
  devServer: {
    port: 314,
    contentBase: './build',
    inline: true // automatic live reload
  }
}
