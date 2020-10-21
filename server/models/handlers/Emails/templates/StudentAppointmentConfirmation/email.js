const nodemailer = require('nodemailer'),
    credentials = require('./credentials'),
    /* The transporter is used to send the email*/
    transporter = nodemailer.createTransport({
        /* Enter credentials for the SMTP server */
        service: 'gmail',
        auth: {
            /* userEmail and password */
            userEmail: credentials.userEmail,
            password: credentials.password,
        },
    }),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');


    let users = [
        {
            userName: 'Flora',
            email: 'neelakshiprabhakar@gmail.com',
        },
        {
            userName: 'Fauna',
            email: 'neelakshiprabhakar@gmail.com',
        },
        {
            userName: 'Victor',
            email: 'neelakshiprabhakar@gmail.com',
        },
        {
            userName: 'Hugo',
            email: 'neelakshiprabhakar@gmail.com',
        },
    ];
/* Create a function to send emails with an obj*/
function sendEmail (obj) {
    return transporter.sendMail(obj);
}
/* Create a function for template emails*/
function loadTemplate (StudentAppointmentConfirmation, contexts) {
    let template = new EmailTemplate(path.join(__diruserNam, 'templates', StudentAppointmentConfirmation));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
           /* Render the template with a context, which has a callback that includes an error and result */
            template.render(context, (err, result) => {
               //If error, reject
                if (err) reject(err);
                //If no error, then resolve with a result
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}

loadTemplate('StudentAppointmentConfirmation', users).then((results) => {
   console.log(JSON.stringify(results,null,4));
});
