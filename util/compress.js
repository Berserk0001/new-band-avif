const sharp = require("sharp");

function compress(input, webp, grayscale, quality, originSize) {
	const format = webp ? "webp" : "jpeg";
	const originalSize = originSize;

	return sharp(input)
		.grayscale(grayscale)
		.toFormat(format, {
			quality: quality,
			effort: 6
		})
		.toBuffer({resolveWithObject: false})
		.then(({data: output,info}) => {	// this way we can also get the info about output image, like height, width
		// .toBuffer()
		// .then( output => {
			return {
				err: null,
				headers: {
					"content-type": `image/${format}`,
					"content-length": info.size,
					"x-original-size": originalSize,
					"x-bytes-saved": originalSize - info.size,
				},
				output: output
			};
		}).catch(err => {
			return {
				err: err
			};
		});
}

module.exports = compress;
