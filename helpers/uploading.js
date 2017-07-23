    const multer = require('multer');



    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../static/imgs')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg');
        }
    });
    let upload = multer({ dest: './../static' });

module.exports = upload;