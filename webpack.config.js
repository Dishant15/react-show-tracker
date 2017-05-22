var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var plugins = [
  new ExtractTextPlugin({ filename :'[name].css', allChunks: false})
];

var entry = [
  "./react/index", 
  "./sass/index"
]


var output = {
  path: __dirname,
};

var js_loader = {
  test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    include: [
      path.resolve(__dirname, "react")
    ],
};

var query = {
  presets: ['react', 'es2015', 'stage-0'],
  plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
};

var out_file;
var sass_loader;

if(debug){
  // development build
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  out_file = "[name].js";     // no hash on output js names
  sass_loader = 'css-loader!sass-loader';     // no minification of css

  // go for hot reload with react
  entry = {
    index : [
      "./react/index",
      "./sass/index",
      'webpack-dev-server/client?http://localhost:8001',
      'webpack/hot/only-dev-server'
    ]
  };

  output['publicPath'] = 'http://localhost:8001/static';
  output['filename'] = out_file;

  js_loader['loaders'] = ['react-hot-loader','babel-loader?'+JSON.stringify(query)];

} else {
  // production build
  plugins.push(
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
    
  );

  // out_file = "[name]-[hash].js";    // add hash to the file name
  out_file = "[name].js";
  sass_loader = 'css-loader!csso-loader!sass-loader';

  // No react hot loader
  js_loader['loader'] = 'babel-loader';
  js_loader['query'] = query;

  output['filename'] = out_file;
}

module.exports = {

  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,

  entry: entry,

  target: 'electron-renderer',

  module: {
    loaders: [
      js_loader,
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: sass_loader })
      }
    ]
  },

  resolve: {
    // with this alias we can use '~/' style absolute imports
    alias : {'~': path.resolve( __dirname, 'react' ) },
    //tells webpack where to look for modules
    modules: ['node_modules'],
    //extensions that should be used to resolve modules
    extensions: [ '.js', '.jsx', '.scss' ]
  },

  output: output,

  plugins: plugins,

};