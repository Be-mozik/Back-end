const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  '413861376555-k4n31kk7ashrqcn40tpt5tvp9jg39suh.apps.googleusercontent.com', // Remplace avec ton client ID
  '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', // Remplace avec ton client secret
  'http://localhost' // Remplace avec ton URL de redirection
);

// URL pour obtenir le code d'autorisation
const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

console.log('Authorize this app by visiting this url:', url);

const code = '4/0AQlEd8zy3aaQPtSJGbo7kWSkfhCGj02fOaA3mGbNUewhXqMVSr3OjjPcr62YmaGsGPPg2w&scope=https://www.googleapis.com/auth/gmail.send';

oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Token', token);
});
