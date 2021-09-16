const sleep = (data, ms) =>
	new Promise((resolve) =>
		setTimeout(() => {
			resolve(data)
		}, ms)
     )

const imageFilter = (req, file, cb) => {
// Accept images only
if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
}

cb(null, true);
};
module.exports = {
    sleep,
    imageFilter
}