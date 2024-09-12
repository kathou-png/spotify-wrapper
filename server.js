// const express = require('express');
// const axios = require('axios');
// const qs = require('querystring');
import dotenv from 'dotenv';

// Configure dotenv
dotenv.config();
import express from 'express';
import axios from 'axios';
import qs from 'querystring';
const app = express();
const port = 3000;

const clientId = "0ba62474fd4f42a596421f2ed1245481";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:5173/user';
console.log(clientId, clientSecret);
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
app.get('/login', function(req, res) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let state = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 16; i++) {
    state += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  //var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    }));
});

// Step 2: Handle Spotify callback and exchange authorization code for access token
app.get('/user', async (req, res) => {
  const { code } = req.query;
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  
  try {
    const response = await axios.post(tokenUrl, qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, refresh_token } = response.data;

    // Send access token back to the frontend
    res.redirect(`http://localhost:5173/?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Authentication failed.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
