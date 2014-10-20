var imgify = require('./index')
  , test = require('tape')

test('Replaces getImageWidth("...") with image width', function(t) {
  var buffer = ''
  var stream = imgify()

  stream
    .on('data', function(d) { buffer += d })
    .on('end', function() {
      t.notEqual(-1, buffer.indexOf('var imgWidthFoo = 800'))
      t.notEqual(-1, buffer.indexOf('var imgWidthBar = 512'))
      t.end()
    })
    .end([
      '',
      'var imgWidthFoo = getImageWidth("test/atom.png")',
      'var imgWidthBar = getImageWidth(\'test/macvim-icon.jpg\')',
      ''
    ].join('\n'))
})

test('Replaces getImageHeight("...") with image height', function(t) {
  var buffer = ''
  var stream = imgify()

  stream
    .on('data', function(d) { buffer += d })
    .on('end', function() {
      t.notEqual(-1, buffer.indexOf('var imgHeightFoo = 600'))
      t.notEqual(-1, buffer.indexOf('var imgHeightBar = 512'))
      t.end()
    })
    .end([
      '',
      'var imgHeightFoo = getImageHeight("test/atom.png")',
      'var imgHeightBar = getImageHeight("test/macvim-icon.jpg")',
      ''
    ].join('\n'))
})

test('Replaces getImageDimensions("...") with image dimensions', function(t) {
  var buffer = ''
  var stream = imgify()

  stream
    .on('data', function(d) { buffer += d })
    .on('end', function() {
      t.notEqual(-1, buffer.indexOf('var imgDimensionsFoo = {"width":800,"height":600'))
      t.notEqual(-1, buffer.indexOf('var imgDimensionsBar = {"height":512,"width":512}'))
      t.end()
    })
    .end([
      '',
      'var imgDimensionsFoo = getImageDimensions("test/atom.png")',
      'var imgDimensionsBar = getImageDimensions("test/macvim-icon.jpg")',
      ''
    ].join('\n'))
})
