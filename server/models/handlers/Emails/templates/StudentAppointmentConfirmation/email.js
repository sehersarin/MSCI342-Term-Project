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
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context,
                });
            });
        });
    }));
}

loadTemplate('StudentAppointmentConfirmation', users).then((results) => {
    return Promise.all(results.map((result) => {
        sendEmail({
            to: result.context.email,
            from: 'AppointmentServer',
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text,
        });
    }));
}).then(() => {
    console.log('Sucessfully sent!');
});
