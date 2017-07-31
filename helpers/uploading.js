const multer = require('multer');
const maxSize = 10000000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'static/imgs/avatar');
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            const err = new Error();
            err.code = 'filetype';
            return cb(err);
        }
        const temp = (file.originalname + '').split('.');
        const fileExt = temp[temp.length-1];
        return cb(null, req.user.username +'.'+ fileExt);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: maxSize } }).single('img');

module.exports = {
    upload,
};
