# Collaborative Event & Polling Platform

A full-stack MERN application for managing events, inviting participants, and conducting polls.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt
- **Deployment**: Render (Backend), Vercel (Frontend), MongoDB Atlas (Database)

## Project Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas URI

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   # or for development
   node server.js
   ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the link provided (usually `http://localhost:5173`).

## Architecture Decisions
- **Folder Structure**: Separated `Frontend` and `Backend` for clear distinction of concerns.
- **Data Modeling**: used `User`, `Event` (with embedded `Poll`) schemas. `Event` references `User` (creator) and `Participants` (list of Users).
- **Authentication**: JWT is used for stateless authentication. Token is stored in LocalStorage on the frontend and sent via Headers.
- **Polls**: Embedded within the Event document for atomic updates and simplicity.

## Challenges & Solutions
- **Challenge**: Handling dates and polling options dynamically.
  - **Solution**: Used arrays in the Mongoose schema and simple comma-separated input strings in the frontend for quick prototyping.
- **Challenge**: "Inviting" users.
  - **Solution**: Implemented a check against the `User` database by email to find the `_id` and add it to the Event's `participants` array.

## Live Links
- **Frontend**: [Link to Vercel Deployment]
- **Backend**: [Link to Render Deployment]
