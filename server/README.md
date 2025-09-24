# Chat App Backend

This directory contains the backend for the Chat App. It is a Node.js/Express server with MongoDB (via Mongoose), Socket.IO for realtime messaging, Cloudinary for file storage, and JWT cookie-based authentication.

- Runtime: Node.js 20.x
- Language/Module: JavaScript (ES Modules)
- Web: Express 4
- DB: MongoDB with Mongoose 8
- Realtime: Socket.IO 4
- Auth: JWT in HTTP-only cookies
- Uploads: Multer + Cloudinary
- Security/Perf: Helmet, Compression, CORS


## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [NPM Scripts](#npm-scripts)
- [API](#api)
  - [Auth & User](#auth--user)
  - [Chats](#chats)
  - [Admin](#admin)
- [Authentication](#authentication)
- [Realtime Events (Socket.IO)](#realtime-events-socketio)
- [Models](#models)
- [Error Handling](#error-handling)
- [Deployment Notes](#deployment-notes)


## Architecture Overview
Key entrypoints and configuration:
- `server/app.js`: Boots the Express app and HTTP server, configures middleware, connects to MongoDB, mounts routes, and initializes Socket.IO with CORS and authentication.
- `server/index.js`: Simple export of the app (if needed by serverless/platform tooling).
- `server/constants/config.js`: CORS options and `CHATAPPTOKEN` cookie name.
- `server/constants/events.js`: Shared Socket.IO event names.
- `server/utils/features.js`: DB connection, cookie options, token utilities, Cloudinary helpers, and event emitter utility.
- `server/middlewares/*`: Authentication (HTTP and Socket), error wrapper, Multer upload config.
- `server/controllers/*`: Route handlers for user, chat, and admin.
- `server/models/*`: Mongoose models for `User`, `Chat`, `Message`, `Request`.


## Folder Structure
```
server/
  app.js
  index.js
  package.json
  vercel.json
  constants/
    config.js
    events.js
  controllers/
    admin.controller.js
    chat.controller.js
    user.controllers.js
  middlewares/
    auth.middleware.js
    error.js
    multer.js
  models/
    user.model.js
    chat.model.js
    message.model.js
    request.model.js
  routes/
    admin.routes.js
    chat.routes.js
    user.routes.js
  utils/
    features.js
    utility.js
  seeders/  (optional helper scripts)
  .env      (not committed; configure locally or in hosting)
```


## Environment Variables
Create `server/.env` with the following keys:

```
# Server
PORT=3000
NODE_ENV=DEVELOPMENT
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://127.0.0.1:27017/chat-app

# JWT & Cookies
JWT_SECRET=replace-with-strong-secret
# Optional: if you want admin login to also set a user cookie
ADMIN_USER_ID=<mongodb_user_id_for_admin_optional>

# Google Sign-In
GOOGLE_CLIENT_ID=<your-google-oauth2-client-id>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

# Admin
ADMIN_SECRET_KEY=admin123
```

Notes:
- `CLIENT_URL` is allowed in CORS (see `constants/config.js`).
- Cookies use the `CHATAPPTOKEN` name defined in `constants/config.js`.


## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Create and fill `server/.env` as above.
3. Ensure MongoDB is reachable from `MONGO_URI`.
4. Start the server (development):
   ```bash
   npm run dev
   ```
   The server listens on `PORT` (default 3000). Root path `GET /` returns a health message.


## NPM Scripts
- `npm run start` — Start in production mode (`node app.js`).
- `npm run dev` — Start with live reload via `nodemon`.


## API
Base path prefixes are mounted in `app.js`:
- `/api/v1/user` — User & auth routes
- `/api/v1/chat` — Chat routes (requires auth)
- `/api/v1/admin` — Admin routes

### Auth & User
File: `routes/user.routes.js`, `controllers/user.controllers.js`

- `POST /api/v1/user/new`
  - Multipart form with avatar file (field name depends on `singleAvatar` config) and JSON body `{ name, username, password, bio }`.
  - Creates user, uploads avatar to Cloudinary, sets auth cookie.

- `POST /api/v1/user/login`
  - JSON `{ username, password }`.
  - On success, sets auth cookie.

- `POST /api/v1/user/google-login`
  - JSON `{ idToken }` (Google ID token).
  - Verifies token with `google-auth-library`, creates/links user, sets auth cookie.

- All routes below require `isAuthenticated`:
  - `GET /api/v1/user/me` — Returns current user profile.
  - `GET /api/v1/user/logout` — Clears auth cookie.
  - `GET /api/v1/user/search?name=` — Search users not already in your 1:1 chats.
  - `PUT /api/v1/user/sendrequest` — Send friend request. Body `{ userId }`.
  - `PUT /api/v1/user/acceptrequest` — Accept/reject request. Body `{ requestId, accept }`.
  - `GET /api/v1/user/notifications` — Pending requests for the user.
  - `GET /api/v1/user/friends` — Friend list (based on 1:1 chats).

Validation is handled via `lib/validators.js` and `validate` middleware.

### Chats
File: `routes/chat.routes.js`, `controllers/chat.controller.js`

All routes require `isAuthenticated`.

- `POST /api/v1/chat/new` — Create group chat. Body `{ name, members: [userId] }`.
- `GET /api/v1/chat/my` — All chats for the current user (transformed list with avatars).
- `GET /api/v1/chat/my/groups` — Groups created by the current user.
- `PUT /api/v1/chat/addmembers` — Add members to a group. Body `{ chatId, members: [userId] }`.
- `PUT /api/v1/chat/removemember` — Remove a member from a group. Body `{ chatId, userId }`.
- `DELETE /api/v1/chat/leave/:id` — Leave a group.
- `POST /api/v1/chat/message` — Send attachment(s) to a chat. Multipart files with body `{ chatId }`. Max 5 files. Uploads to Cloudinary.
- `GET /api/v1/chat/messages/:id` — Paginated messages for a chat (see controller for query handling).
- `GET /api/v1/chat/:id` — Chat details.
- `PUT /api/v1/chat/:id` — Rename group. Body `{ name }`.
- `DELETE /api/v1/chat/:id` — Delete chat.

### Admin
File: `routes/admin.routes.js`, `controllers/admin.controller.js`

- `POST /api/v1/admin/verify` — Admin login. Body `{ secretKey }`.
  - Sets `adminchatapptoken` cookie (15 minutes). Optionally sets `chatapptoken` if `ADMIN_USER_ID` provided.
- `GET /api/v1/admin/logout` — Clears admin cookie.
- Admin-only below (`onlyAdmin` middleware):
  - `GET /api/v1/admin/` — Sanity check for admin session.
  - `GET /api/v1/admin/users` — List users with aggregate counts (groups, friends).
  - `GET /api/v1/admin/chats` — List chats with members, creator, message counts.
  - `GET /api/v1/admin/messages` — List all messages with sender info.
  - `GET /api/v1/admin/stats` — Dashboard stats and last-7-days message chart data.


## Authentication
- HTTP requests use JWT stored in an HTTP-only cookie named `chatapptoken` (see `constants/config.js` and `utils/features.js`).
- `middlewares/auth.middleware.js` provides `isAuthenticated` for HTTP and `socketAuthenticator` for sockets.
- CORS is configured in `constants/config.js` with `credentials: true`.
- Include credentials in frontend fetch/XHR and Socket.IO client.

Cookie example header (set by server):
```
Set-Cookie: chatapptoken=<jwt>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=1296000
```


## Realtime Events (Socket.IO)
Namespace: default. Authenticated via cookie parsing in `app.js`:
```js
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) => await socketAuthenticator(err, socket, next));
});
```

Published/consumed events (see `constants/events.js`):
- `NEW_MESSAGE`
- `NEW_MESSAGE_ALERT`
- `START_TYPING`
- `STOP_TYPING`
- `CHAT_JOINED`
- `CHAT_LEAVED`
- `ONLINE_USERS`
- `ALERT`
- `REFETCH_CHATS`
- `NEW_ATTACHMENT`
- `NEW_REQUEST`

Example: client emits `NEW_MESSAGE` with `{ chatId, members, message }`. Server broadcasts to member sockets, persists to DB in `Message`.


## Models
- `User` (`models/user.model.js`)
  - `name`, `bio`, `username` (unique), `password` (hashed in `pre('save')`), `avatar { public_id, url }`
- `Chat` (`models/chat.model.js`)
  - `name`, `groupChat`, `creator`, `members[]`
- `Message` (`models/message.model.js`)
  - `content`, `attachments[] { public_id, url }`, `sender`, `chat`, timestamps
- `Request` (`models/request.model.js`)
  - `status` (pending, accepted, rejected), `sender`, `receiver`


## Error Handling
- Controllers are wrapped with `TryCatch` from `middlewares/error.js`.
- Centralized `errorMiddleware` is registered last in `app.js`.
- Validation via `express-validator` in `lib/validators.js`, enforced by `validate` middleware.


## Deployment Notes
- Ensure `NODE_ENV=PRODUCTION` to enable long-term cache headers for static assets.
- Set correct `CLIENT_URL` and CORS in `constants/config.js` or env override.
- Provide all secrets via environment variables.
- Platform examples:
  - Render/PM2: run `npm run start`.
  - Vercel: `vercel.json` exists; may be used depending on your setup (ensure serverful deployment or proper serverless entrypoint).


## Quick Test (cURL)
- Register:
  ```bash
  curl -X POST http://localhost:3000/api/v1/user/new \
    -H "Content-Type: multipart/form-data" \
    -F "name=Alice" -F "username=alice1" -F "password=pass1234" -F "bio=Hi" \
    -F "avatar=@/path/to/avatar.png"
  ```
- Login:
  ```bash
  curl -X POST http://localhost:3000/api/v1/user/login \
    -H 'Content-Type: application/json' \
    -d '{"username":"alice1","password":"pass1234"}' -i
  ```
- Me (with cookie):
  ```bash
  curl http://localhost:3000/api/v1/user/me \
    -H 'Cookie: chatapptoken=<paste_token_from_set_cookie>'
  ```
