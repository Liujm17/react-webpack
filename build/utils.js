const packageConfig = require('../package.json')
const path = require('path')

//生成打包文件封装路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
}

//产生dev环境下的提示信息  清理无用信息node-notifier
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')
  
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }
  