// webpack.config.js
module.exports = {
  entry: {
    list:               './modules/list/js/list.js',
    detail:             './modules/detail/js/detail.js',
    //'create':           './modules/createaction/js/create.js'
    'create-basic':     './modules/createaction/js/create-basic.js',

    //'create-criteria':  './modules/createaction/js/create-criteria.js'
    'message':     './modules/message/js/message.js',
    'mine':     './modules/mine/js/mine.js',
    'activity':     './modules/activity/js/activity.js',
    'register':     './modules/register/js/register.js',
    'login':     './modules/login/js/login.js',
    'search':     './modules/search/js/search.js',

  },
  output: {
    path: 'build',
    filename: '[name].js'       
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    // 现在可以写 require('file') 代替 require('file.less')
    extensions: ['', '.js', '.css', '.less'] 
  }
};