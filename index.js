var through = require('through')
var sizeOf = require('image-size')
var patternForWidth = /getImageWidth\(([^\)]+)\)/g
var patternForHeight = /getImageHeight\(([^\)]+)\)/g
var patternForDimensions = /getImageDimensions\(([^\)]+)\)/g

var cleanImagePath = function (imgagePath) {
  return imgagePath.replace(/['"]/g, '')
}

module.exports = function (file, argv) {
  if (/\.json$/.test(file)) return through()

  var buffer = []
  argv = argv || {}

  return through(write, flush)

  function write(data) {
    buffer.push(data)
  }

  function flush() {
    var source = buffer.join('')
    var _this = this

    if (patternForWidth.test(source)) {
      source.replace(patternForWidth, function (match, imgagePath) {
        imgagePath = cleanImagePath(imgagePath)

        try {
          var dimensions = sizeOf(imgagePath)
          source = source.replace(match, dimensions.width)
        } catch (err) {
          return _this.emit('error', err)
        }
      })
    }

    if (patternForHeight.test(source)) {
      source.replace(patternForHeight, function (match, imgagePath) {
        imgagePath = cleanImagePath(imgagePath)

        try {
          var dimensions = sizeOf(imgagePath)
          source = source.replace(match, dimensions.height)
        } catch (err) {
          return _this.emit('error', err)
        }
      })
    }

    if (patternForDimensions.test(source)) {
      source.replace(patternForDimensions, function (match, imgagePath) {
        imgagePath = cleanImagePath(imgagePath)

        try {
          var dimensions = sizeOf(imgagePath)
          delete dimensions.type
          source = source.replace(match, JSON.stringify(dimensions))
        } catch (err) {
          return _this.emit('error', err)
        }
      })
    }

    this.queue(source)
    this.queue(null)
  }
}
