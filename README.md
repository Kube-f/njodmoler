# njodmoler
node mailer wrapper for use with Kit and Kube

## installing

for npm

```bash
$ npm install nodemailer --save
$ cd app/app_addons
$ git clone git@github.com:Kube-f/njodmoler.git
```

for yarn

```bash
$ yarn add nodemailer
$ cd app/app_addons
$ git clone git@github.com:Kube-f/njodmoler.git
```

Finally add the following variables to your `.env` file and fill them out accordingly

```
[nodemailer]
EMAIL_FROM=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
```