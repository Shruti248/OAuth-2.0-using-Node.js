// Step 2 - Part 1
// 2. Configure the Endpoint Used To Redirect User to Authorization Server

// Redirect URI: the endpoint used by the authorization server to issue the authorization token
// Response type: must be set to code to ensure that the server issues an authorization token
// Client ID: a unique id used to identify our app on the authorization server

// Step 4 
// 4. Use the Authorization Token to Obtain an Access Token

const query_string = require ('querystring');

//  Step 4 : 1) first imported the Axios module
const axios = require('axios');

// Step 4 : 2)Next, we defined the endpoint used to obtain the access token.
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';

const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth';
const query_params = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:3000${process.env.REDIRECT_URI}`,
};

// this objects contains information that will be passed as query params to the auth // token endpoint
  const auth_token_params = {
    ...query_params,
    response_type: 'code' /** const authorization_token = req.query.code ---  this code is used to get the access token from the request to the rediurect URI */, 
  };

// Step 4 : 3) After that, we defined a method that expects the authorization token as its parameter, and then finally, we created an object with several keys such as the client id, client secret as well as other newer parameters, which include:

// Client secret: a string used to sign our request.
// Grant type: as said earlier, this is a set of authorization codes. This field could hold a password or any other grant type depending on the application needs.
// Code: this holds the authorization code.

// Internally, this method makes a post request to the endpoint to obtain the access token.

  const get_access_token = async auth_code => {
    const access_token_params = {
      ...query_params,
      client_secret: process.env.CLIENT_APP_SECRET,
      code: auth_code,
      grant_type: 'authorization_code',
    };
    return await axios ({
      method: 'post',
      url: `${google_access_token_endpoint}?${query_string.stringify (access_token_params)}`,
    });
  };

// the scopes (portion of user's data) we want to access
const scopes = ['profile', 'email', 'openid'];

// a url formed with the auth token endpoint and the
  const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;

//   Step 4 : 4) Finally, we added the method to our list of exports.
module.exports ={request_get_auth_code_url , get_access_token}