
const nodemailer = require("nodemailer");

var mailService={
    mailer:mailer
}

async function mailer(email,pass,res){

    let emailid=email

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
  subject: 'Sending Email using Node.js',
  text: 'your id is '+emailid+' and password is :'+pass
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    return res.status(202).json({error})

  } else {
    console.log('Email sent: ' + info.response);
    return res.status(200).json({info})

  }
});


}
module.exports=mailService