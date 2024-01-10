require('dotenv').config();
const express = require ('express');

const app = express();

app.get ('/auth', async (req, res) => {
  res.send("auth route")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})