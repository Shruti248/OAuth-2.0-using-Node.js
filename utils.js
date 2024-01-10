// 2. Configure the Endpoint Used To Redirect User to Authorization Server

// Redirect URI: the endpoint used by the authorization server to issue the authorization token
// Response type: must be set to code to ensure that the server issues an authorization token
// Client ID: a unique id used to identify our app on the authorization server

const query_string = require ('querystring');
const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth';
const query_params = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:3000${process.env.REDIRECT_URI}`,
};

// this objects contains information that will be passed as query params to the auth // token endpoint
  const auth_token_params = {
    ...query_params,
    response_type: 'code',
  };

// the scopes (portion of user's data) we want to access
const scopes = ['profile', 'email', 'openid'];

// a url formed with the auth token endpoint and the
  const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;
  
module.exports ={request_get_auth_code_url}