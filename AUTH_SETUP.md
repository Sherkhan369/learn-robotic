# Authentication Setup Guide

This project uses better-auth.com for authentication. The setup involves two main components:

## Architecture

1. **Frontend (Docusaurus)**: Serves the static site on GitHub Pages
2. **Backend (better-auth API)**: Handles authentication requests on a separate server

## Configuration

### Environment Variables

#### Frontend (Docusaurus)

For development, create a `.env` file in the `frontend/` directory:

```bash
# Development environment variables for the frontend
REACT_APP_BETTER_AUTH_API_URL=http://localhost:4001/api/auth
```

For production, create a `.env.production` file in the `frontend/` directory:

```bash
# Production environment variables for the frontend
REACT_APP_BETTER_AUTH_API_URL=https://your-deployed-better-auth-api.com/api/auth
```

Replace `https://your-deployed-better-auth-api.com/api/auth` with the actual URL of your deployed better-auth API.

### Backend (better-auth API)

Create a `.env` file in the `better-auth-api/` directory:

```bash
# Better Auth API Environment Variables
PORT=4001
BETTER_AUTH_SECRET=d1aa222832d22ee2e86e18968f7453a229501391eb26069390af23280c11e72b
FRONTEND_URL=http://localhost:3002
```

For production deployment, update FRONTEND_URL to your GitHub Pages URL (e.g., `https://sherkhan369.github.io/learn-robotic`).

## Deployment

### Deploying the better-auth API

The better-auth API needs to be deployed to a server that supports Node.js. Options include:

1. **Vercel** (recommended)
2. **Railway**
3. **Render**
4. **Heroku**
5. **Any Node.js hosting service**

### Environment Configuration for Deployment

When deploying the better-auth API, make sure to set these environment variables:

- `BETTER_AUTH_SECRET`: A 64-character hex string for signing sessions (use `npx @better-auth/cli secret` to generate)
- `DATABASE_URL`: Connection string for your database (PostgreSQL recommended)
- `FRONTEND_URL`: The URL of your deployed Docusaurus site (e.g., `https://sherkhan369.github.io/learn-robotic`)

## Development Setup

To run the application locally:

1. Start the better-auth API server:
   ```bash
   cd better-auth-api
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npx docusaurus start --port 3002
   ```

The application will be available at `http://localhost:3002/learn-robotic/`

## API Endpoints

The better-auth API provides the following endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the `FRONTEND_URL` in your better-auth API environment variables matches your frontend URL exactly.

2. **Network Errors**: Verify that the `REACT_APP_BETTER_AUTH_API_URL` in your frontend environment variables points to the correct API URL.

3. **Session Not Persisting**: Check that both your frontend and backend are using HTTPS in production, and that cookies are being set properly.

### Debugging Steps

1. Check browser developer tools for network errors
2. Verify that the better-auth API server is running and accessible
3. Confirm that CORS settings allow requests from your frontend domain
4. Ensure environment variables are set correctly in both frontend and backend deployments