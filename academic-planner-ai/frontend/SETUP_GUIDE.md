# Student Planner Frontend - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)
- Backend server running on `http://localhost:5000`

### Verify Installation

Open terminal and run:
```bash
node --version   # Should show v16.x.x or higher
npm --version    # Should show 8.x.x or higher
```

## Installation

### Step 1: Extract the Project

Extract the `frontend.zip` file to your desired location.

### Step 2: Navigate to Project Directory

```bash
cd frontend
```

### Step 3: Install Dependencies

This will install all required packages (React, Redux, Tailwind CSS, etc.):

```bash
npm install
```

**Expected output:** You should see packages being installed. This may take 2-3 minutes.

### Step 4: Verify Installation

Check that `node_modules` folder was created with all dependencies.

## Running the Application

### Step 1: Start the Backend Server

**IMPORTANT:** The backend must be running before starting the frontend.

In a separate terminal:
```bash
cd ../backend
node server.js
```

You should see: `Server running on port 5000`

### Step 2: Start the Frontend Development Server

In the frontend directory:
```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Testing

### Test User Registration

1. Click "Register here" on the login page
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
3. Click "Register"
4. You should be redirected to the Dashboard

### Test Login

1. Navigate to login page
2. Enter:
   - Email: test@example.com
   - Password: password123
3. Click "Login"
4. You should be redirected to the Dashboard

### Test Features

**Dashboard:**
- Should display statistics cards
- Shows upcoming deadlines
- Displays recent progress

**Tasks:**
1. Click "Tasks" in sidebar
2. Click "+ Add Task"
3. Fill in task details
4. Click "Create Task"
5. Task should appear in the list
6. Try editing and deleting tasks

**Timetable:**
1. Click "Timetable" in sidebar
2. Click "+ Add Entry"
3. Select day, time, and subject
4. Click "Add Entry"
5. Entry should appear under the selected day

**Progress:**
1. Click "Progress" in sidebar
2. Click "+ Log Progress"
3. Enter subject and hours
4. Click "Log Progress"
5. Total hours should update

**AI Tips:**
1. Click "AI Tips" in sidebar
2. Click "🔄 Refresh Tips"
3. AI recommendations should load

**Profile:**
1. Click "Profile" in sidebar
2. Your account information should be displayed

## Troubleshooting

### Issue: Cannot connect to backend

**Symptoms:** API errors, "Network Error" messages

**Solution:**
1. Verify backend is running on port 5000
2. Check backend terminal for errors
3. Ensure MongoDB is running (if backend uses it)
4. Check `src/services/api.js` has correct baseURL

### Issue: npm install fails

**Symptoms:** Errors during installation

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Update npm:
   ```bash
   npm install -g npm@latest
   ```

### Issue: Port 3000 already in use

**Symptoms:** "Port 3000 is already in use"

**Solutions:**
1. Kill the process using port 3000:
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # On Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```
2. Or run on different port:
   ```bash
   npm run dev -- --port 3001
   ```

### Issue: White screen after login

**Symptoms:** Blank page, no errors in console

**Solutions:**
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed API requests
4. Verify token is stored in localStorage:
   - DevTools → Application → Local Storage
   - Should see `token` and `user` keys

### Issue: Login fails with correct credentials

**Symptoms:** "Login failed" error

**Solutions:**
1. Check backend terminal for errors
2. Verify backend `/api/auth/login` endpoint is working
3. Test with Postman/Thunder Client:
   ```
   POST http://localhost:5000/api/auth/login
   Body: { "email": "test@example.com", "password": "password123" }
   ```
4. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```

### Issue: Tailwind styles not loading

**Symptoms:** Unstyled appearance, missing colors

**Solutions:**
1. Verify `tailwind.config.js` exists
2. Check `index.css` has Tailwind directives
3. Restart development server:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```

### Issue: Tasks/Data not loading

**Symptoms:** Empty lists, no data displayed

**Solutions:**
1. Check browser Network tab (F12)
2. Verify API requests are successful (200 status)
3. Check backend database has data
4. Ensure JWT token is valid:
   - Should auto-logout if expired
   - Try logging out and back in

## Performance Tips

### For Development

1. Keep DevTools open to monitor network/console
2. Use React DevTools extension for debugging
3. Clear browser cache if styles seem cached

### For Production Build

Build optimized version:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Environment Variables

Create `.env` file in root (optional):

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Student Planner
```

Then update `src/services/api.js`:
```javascript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

## Additional Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## File Structure Reference

```
frontend/
├── public/              # Static assets
├── src/
│   ├── app/            # Redux store
│   ├── features/       # Feature slices & APIs
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API configuration
│   ├── App.jsx         # Main app
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Support

For issues or questions:
1. Check this guide first
2. Review browser console for errors
3. Check backend server logs
4. Verify all prerequisites are installed
5. Ensure backend and frontend versions match

## Success Checklist

- [ ] Node.js v16+ installed
- [ ] Backend running on port 5000
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard displays correctly
- [ ] Can create tasks
- [ ] Can add timetable entries
- [ ] Can log progress
- [ ] Can view AI tips
- [ ] Profile displays correctly

## Next Steps

After successful setup:
1. Explore all features
2. Test creating, editing, deleting data
3. Verify API integration
4. Test responsive design (resize browser)
5. Check mobile view (DevTools device toolbar)

---

**Congratulations!** Your Student Planner frontend is now set up and running! 🎉
