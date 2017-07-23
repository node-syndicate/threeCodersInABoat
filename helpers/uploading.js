const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'static/imgs/avatar');
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|wav|tif|gif)$/)) {
            const err = new Error();
            err.code = 'filetype';
            return cb(err);
        }

        // return cb(null, file.originalname + '-' + Date.now());
        return cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;