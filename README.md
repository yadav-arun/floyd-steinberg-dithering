# Floyd Steinberg Dithering for node

## Intall via NPM

Install floyd-steinberg-dithering node package using npm , `npm install floyd-steinberg-dithering`

## API
All available functions are :

- process() : receives two parameter, `source path of file with file name` & `destination of file with file name`

## Usage and Example

Say filename is : ```dither.js```

``` js

var fsDither = require("floyd-steinberg-dithering");

// Must have a file with same name as src path at the location

// process the floyd steinberg dithering
fsDither.process('./src.png', './dest.png');


```

Use `node dither.js`, logs will contain the response.

## License

Unless stated elsewhere, file headers or otherwise, the license as stated in the LICENSE file.
