
const nodemailer = require("nodemailer");


var mailService = {
  mailer: mailer
}

async function mailer(email, pass, name) {

  let emailid = email

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hrmsbackend2022@gmail.com',
      pass: 'dufwsicimpfmeuch'
    }
  });

  var mailOptions = {
    from: 'hrmsbackend2022@gmail.com',
    to: emailid,
    subject: 'Bheema credentials!!!',
    text: 'Welcome ' + name + ' to Bheema , your id is ' + emailid + ' and password is :' + pass
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return ({ error })

    } else {
      console.log('Email sent: ' + info.response);
      // return ({info})

    }
  });


}
module.exports = mailService;