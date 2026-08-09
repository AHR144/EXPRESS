export const apiPath = 'api/';

export const APP_HOST = process.env.APP_HOST || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;
export const HOST = `${APP_HOST}:${APP_PORT}/`;

// Relative path: works no matter what domain/port this is actually served
// from (localhost, Render, Vercel, ...) since the frontend and API always
// share the same origin in this app.
export const API_URL = `/${apiPath}`;
export const JWT_TOKEN = 'token';