import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import https from 'https';
import spdy from 'spdy';

import Server from './config/server.config';
import { SERVER_PORT } from './config/env.config';
import { connectDB } from './config/db/mongoClient';

async function startServer() {
  try {
    //LOCAL HOST NORMAL
    await connectDB()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
      });

    Server.listen(SERVER_PORT, () => {
      console.info(`Server running on http://localhost:${SERVER_PORT}`);
    });

    //HTTPS
    const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
    const certificate = fs.readFileSync('localhost.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, Server);
    httpsServer.listen(8443, () => {
      console.log(`Servidor HTTPS escuchando en https://localhost:${8443}`);
    });

    //HTTP2
    const http2Server = spdy.createServer(credentials, Server);

    http2Server.listen(8444, () => {
      console.log(`Servidor HTTP/2 escuchando en https://localhost:${8444}`);
    });

  } catch (error) {
    console.error('Error starting server', error);
    process.exit(1);
  }
}

startServer();
