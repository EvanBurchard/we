// EmailService.js - in api/services
// from https://github.com/balderdashy/sails-docs/blob/0.9/services.md

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "alberto.souza.99@gmail.com",
        pass: "eusoufoda123"
    }
});

exports.sendInviteEmail = function(options) {

    var opts = {"type":"messages","call":"send","message":
        {
            "subject": "YourIn!",
            "from_email": "alberto.souza.99@gmail.com",
            "from_name": "AmazingStartupApp",
            "to":[
                {"email": options.email, "name": options.name}
            ],
            "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
        }
    };


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: sails.config.appName + " <" + sails.config.siteEmail + ">", // sender address
        to: options.email, // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world", // plaintext body
        html: "<b>Hello world</b>" // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });

    //myEmailSendingLibrary.send(opts);
};