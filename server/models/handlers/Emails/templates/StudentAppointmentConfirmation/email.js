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
