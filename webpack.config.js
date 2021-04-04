const path = require('path');

module.exports = (env, options) => ({
  entry: './src/index.ts',
  devtool: /*options.mode === "production" ? false : */'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }/*,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }*/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: []
});