# CollabEvents - Collaborative Event & Polling Platform 🚀

A modern, full-stack MERN application for planning events, inviting friends, and conducting real-time polls to find the perfect time or activity. Rebranded and enhanced with a stunning Glassmorphism UI and Dark Mode.

## ✨ Key Features
- **Event Management**: Create, edit, and delete events with ease.
- **Interactive Polls**: Vote on dates, locations, or food options with real-time progress bars.
- **Dark & Light Mode**: Fully rebranded with a system-aware theme toggle (☀️/🌙).
- **Glassmorphism UI**: A premium, modern design using semi-transparent glass panels and vibrant gradients.
- **Responsive Design**: Optimized for seamless use on mobile, tablet, and desktop.
- **Secure Auth**: JWT-based authentication with encrypted passwords.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS v4, PostCSS, Axios, React Router, Context API (Theme & Auth)
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt
- **Deployment**: Render (Backend), Vercel (Frontend), MongoDB Atlas (Database)

## 🚀 Live Links
- **Frontend**: https://collaborative-event-polling-platfor-rho.vercel.app/
- **Backend**: https://collaborative-event-polling-platform-l828.onrender.com

## ⚙️ Project Setup

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
3. Create a `.env` file in `Frontend/` with the following (optional for local dev, usually defaults to localhost):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the link provided (usually `http://localhost:5173`).

## 🏗️ Architecture Decisions
- **Folder Structure**: Separated `Frontend` and `Backend` for clear distinction of concerns.
- **Data Modeling**: used `User`, `Event` (with embedded `Poll`) schemas. `Event` references `User` (creator) and `Participants` (list of Users).
- **Authentication**: JWT is used for stateless authentication. Token is stored in LocalStorage on the frontend and sent via Headers.
- **Theme System**: Custom `ThemeContext` manages system preference detection and manual overrides, storing state in LocalStorage.

## 💡 Challenges & Solutions
- **Challenge**: Modernizing the UI with Tailwind v4.
  - **Solution**: Migrated to the new `@import "tailwindcss";` syntax and used CSS variables for dynamic Dark Mode theming.
- **Challenge**: "Inviting" users securely.
  - **Solution**: Implemented a check against the `User` database by email to find the `_id` and add it to the Event's `participants` array.
