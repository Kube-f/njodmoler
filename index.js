import nodemailerModule from 'nodemailer';
import Promise from 'bluebird';

export default function nodemailer(kube) {
    const nodemailer = kube.namespace('nodemailer');

    Promise.promisifyAll(nodemailerModule, { suffix: 'Promise'});

    nodemailer.def(function setupAccount() {
        const defaultHost = 'smtp.ethereal.email';
        const host = process.env.EMAIL_HOST || defaultHost;

        nodemailerModule.createTestAccount()
            .then(function handleTestAccount(account) {
                kube.logger.trace({ account }, 'created ethereal email acocunt');
            })
            .catch(function handleError(error) {
                kube.logger.error({ error }, 'Error creating ethereal account');
            });
    });
}