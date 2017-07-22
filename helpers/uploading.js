    const multer = require('multer');



const uploader = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../static/imgs/avatar/')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        }
    });
    const upload = multer({ storage: storage }).single('profileImage');
    return upload;
};

module.exports = uploader;