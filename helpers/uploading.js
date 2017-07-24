const multer = require('multer');
const fs = require('fs');
const Binary = require('mongodb').Binary;

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
        // return cb(null, file.originalname + '-' + Date.now());
        return cb(null, req.user.username +'.'+ fileExt);
    },
});

const upload = multer({ storage: storage });

const getDefaultProfilePricture = () => {
    const newImg =
        fs.readFileSync('static/imgs/defaultProfile.png');

    const image = {
        default: new Binary(newImg.toString('base64')),
    };

    return image;
};

const getNewProfilePicture = (req) => {
    const newImg = fs.readFileSync(req.file.path);

    const image = {
        contentType: req.file.mimetype,
        size: req.file.size,
        encoded: new Binary(newImg.toString('base64')),
    };

    return image;
};


module.exports = {
    upload,
    getDefaultProfilePricture,
    getNewProfilePicture,
};