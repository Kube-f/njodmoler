import nodemailerModule from 'nodemailer';
import Promise from 'bluebird';

export default function nodemailer(kube) {
    const nodemailer = kube.namespace('nodemailer');

    Promise.promisifyAll(nodemailerModule, { suffix: 'Promise'});

    nodemailer.def(function setupFakeAccount() {

        nodemailerModule.createTestAccount()
            .then(function handleTestAccount(account) {
                kube.logger.trace({ account }, 'created ethereal email acocunt');
            })
            .catch(function handleError(error) {
                kube.logger.error({ error }, 'Error creating ethereal account');
            });
    });

    nodemailer.def(function setupTransporter(user, pass) {
        const defaultHost = 'smtp.ethereal.email';
        const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE} = process.env;
        const host = EMAIL_HOST ? EMAIL_HOST : defaultHost;
        const options = {
            host,
            port: EMAIL_PORT,
            secure: EMAIL_SECURE,
            auth: {
                user,
                pass
            }
        }

        return nodemailerModule.createTransport(options)
            .catch(function handleCreateTransportError(error) {
                kube.logger.error({ error }, 'error creating nodeMailer transport')
                throw new Error(error);
            })
    })

    nodemailer.def(function sendMail(transporter, options) {
        return transporter.sendMail(options)
            .catch(function handleSendMailError(error) {
                kube.logger.error({ error }, 'Error while sending email');
                throw new Error('Error while sending mail');
            })
    })
}