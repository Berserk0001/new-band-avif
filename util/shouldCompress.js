const MIN_COMPRESS_LENGTH = 1024; // ~2Kb
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 10; // ~20KB

function shouldCompress(originType, originSize, avif) {
	if (!originType.startsWith("image")) return false;
	if (originSize === 0) return false;
	if (avif && originSize < MIN_COMPRESS_LENGTH) return false;
	if (	// if png or gif image, and size is less than compression limit (also shouldn't be webp)
		!avif &&
		(originType.endsWith("png") || originType.endsWith("gif")) &&
		originSize < MIN_TRANSPARENT_COMPRESS_LENGTH
	) {
		return false;
	}

	return true;
}

module.exports = shouldCompress;
