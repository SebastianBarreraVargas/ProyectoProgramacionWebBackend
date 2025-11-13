import dotenv from 'dotenv';
dotenv.config();

import Server from './config/server.config.js';

import { SERVER_PORT } from './config/env.config.js';

import { connectDB } from './config/db/mongoClient.js';

async function startServer() {
  try {
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
  } catch (error) {
    console.error('Error starting server', error);
  }
}

startServer();
