require('dotenv').config();
const express = require('express');
const utils = require('./utils')

const app = express();

// Step 2 - part 2 
// In our /auth endpoint, we redirect the user to the authorization server using the URL we imported earlier, save the code and restart the server.
app.get('/auth', async (req, res) => {
    //   res.send("auth route")
    try {
        res.redirect(utils.request_get_auth_code_url);
    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
});

// 3. Configure the Endpoint To Obtain the Authorization Token

// After the user successfully authenticates, the app still shows an error. The authorization server makes a GET request to the redirect URI provided in the previous request, but we haven’t defined an endpoint on our server to handle it.

app.get(process.env.REDIRECT_URI, async (req, res) => {
    // ! get authorization token from request parameter
    const authorization_token = req.query.code;

    // console.log("Autorization Token : ", authorization_token);

    // Step 4 : 5) The below code uses the method defined in the utils.js file to request the access token. The response to this request contains several values such as the following:

    // Access token: used to obtain the resource
    // Refresh token (optional): used to obtain another access token if the current one expires

    try {
        // ! get access token using authorization token
        const response = await utils.get_access_token(authorization_token);
        console.log({ data: response.data });
        // get access token from payload
        const { access_token } = response.data;

        // Step 5 : 2) 
        //  get user profile data
        const user = await utils.get_profile_data(access_token);
        const user_data = user.data;
        res.send(`
      <h1> WELCOME, ${user_data.name}</h1>
      <img src="${user_data.picture}" alt="user_image" />
    `);
        console.log(user_data);

    } catch (error) {
        res.sendStatus(500);
    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})