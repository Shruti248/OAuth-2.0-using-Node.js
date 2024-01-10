require('dotenv').config();
const express = require('express');
const utils = require('./utils')

const app = express();


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})