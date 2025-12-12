import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT_HTTP1 = process.env.SERVER_PORT_HTTP1 || 3000;

export const SERVER_PORT_HTTPS = process.env.SERVER_PORT_HTTPS || 8443;

export const SERVER_PORT_HTTP2 = process.env.SERVER_PORT_HTTP2 || 8444;
