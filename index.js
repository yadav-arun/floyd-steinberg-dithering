// #!/usr/bin/env node
var Jimp = require('jimp');

function FloydSteinbergDithering(errorMultiplier, data, w, h) {

    var filter = [
        [0, 0, 0, 7 / 48, 5 / 48],
        [3 / 48, 5 / 48, 7 / 48, 5 / 48, 3 / 48],
        [1 / 48, 3 / 48, 5 / 48, 3 / 48, 1 / 48]
    ];

    var error = [];
    var x, y, xx, yy, r, g, b;

    for (y = 0; y < h; y++)error.push(new Float32Array(w));

    for (y = 0; y < h; y++) {

        for (x = 0; x < w; x++) {
            var id = ((y * w) + x) * 4;

            r = data[id];
            g = data[id + 1];
            b = data[id + 2];

            var avg = (r + g + b) / 3;
            avg -= error[y][x] * errorMultiplier;

            var e = 0;
            if (avg < 128) {
                e = -avg;
                avg = 0;
            }
            else {
                e = 255 - avg;
                avg = 255;
            }

            data[id] = data[id + 1] = data[id + 2] = avg;
            data[id + 3] = 255;

            for (yy = 0; yy < 3; yy++) {
                for (xx = -2; xx <= 2; xx++) {
                    if (y + yy < 0 || h <= y + yy
                        || x + xx < 0 || w <= x + xx) continue;

                    error[y + yy][x + xx] += e * filter[yy][xx + 2];
                }
            }
        }
    }
    return data;
}

// instead of this, use two params from user created file, for image path , and saving absolute path
if (!process.argv[2]) {
    console.log("Provide image path");
} else {
    try {
        Jimp.read(process.argv[2]).then(image => {
            var a = FloydSteinbergDithering(1, image.bitmap.data, image.bitmap.width, image.bitmap.height);
            new Jimp({ data: a, width: image.bitmap.width, height: image.bitmap.height }, (err, image) => {
                image.write('dither.png')
                console.log('File saved as dither.png');
            });
        }, err => {
            if (err.code == "ENOENT") {
                console.log("Mentioned file does not exist");
            } else {
                console.log("Use correct filname, and make sure file used is image");
            }
        });
    } catch (error) {
        console.log("Use correct filname, and make sure file used is image");
    }
}