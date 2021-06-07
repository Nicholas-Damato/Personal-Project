require('dotenv').config()
const nodemailer = require('nodemailer');
const { SERVER_EMAIL, SERVER_PASSWORD } = process.env

module.exports = {
   send: async (req, res) => {
       const { email, username } = req.body
    if(email === ''){
        res.sendStatus(406)
    }
    let transporter = nodemailer.createTransport({
        auth: {
            user: SERVER_EMAIL, 
            pass: SERVER_PASSWORD, 
        },
        service: 'gmail'
    });
  
    let info = await transporter.sendMail({
      from: '"Your best friend <test@testing.com>"', 
      to: `${email}`, 
      subject: "Username Change ✔", 
      html: `<p> You have changed your username to ${username} </p>`, 
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


    
}