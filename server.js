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

    console.log("Access Token : ", authorization_token);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})