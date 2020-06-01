const fetch = require('node-fetch');
const base64 = require('base-64');
const utf8 = require('utf8');

const { totp } = require('otplib');


const body = 
{
    "github_url": "https://github.com/Anguandia/hennge_admission_challenge",
    "contact_email": "mikeanguandia@gmail.com"
}
const bodyString = JSON.stringify(body);

const url = "https://api.challenge.hennge.com/challenges/003";
const sharedSecret = `${body.contact_email}HENNGECHALLENGE003`;

totp.options = { digits: 10, algorithm: 'sha512', epoch: 0 }

const password = totp.generate(sharedSecret);
const isValid = totp.check(password, sharedSecret);

console.log({password, isValid});

const authStringUTF = `${body.contact_email}:${password}`;
const bytes = utf8.encode(authStringUTF);
const encoded = base64.encode(bytes);

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${encoded}`,
  Accept: 'application/json'
}

fetch(url, { method: 'POST', headers, body: bodyString})
  .then((resp) => {
    console.log({headers, url, body});
    return resp.json()
  })
  .then((data) => 
    console.log(data)
  )