const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'shahbazrafique429@gmail.com',
        pass: 'lfihdshwhptmyvpk'
    }
});
module.exports={transporter}