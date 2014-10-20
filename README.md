# image-dimensions-browserify

Have you ever needed to add an onLoad handler to an image so that your
JavaScript can be aware of the image dimensions?

Did that feel silly because the image was right there in the repository
and your CSS preprocessor could already do the same?

Given:

```javascript
var imageWidth = getImageWidth('some-picture.jpg');
var imageHeight = getImageHeight('some-picture.png');
var imageDimensions = getImageDimensions('some-picture.svg');
```

Result:

```javascript
var imageWidth = 800;
var imageHeight = 600;
var imageDimensions = {width: 800, height: 600};
```
