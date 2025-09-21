const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    streamTransport: true,
    newline:'unix',
    buffer:true
})

async function sendMail(to,subject, text) {
    const message = {
        from :'noreply@eventplatfomr.com',
        to,
        subject,
        text
    }
    const info = await transporter.sendMail(message)
    console.log('Email sent (dev mode):\n',
    info.message.toString())
    
}

module.exports = {sendMail}