const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    auth:{
        user: 'webtatacoatours@gmail.com',
        pass: 'hfbiiooezryxmqxd'
    },
})
module.exports = transporter