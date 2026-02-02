# How to Start Your Backend Server

## Quick Start Command

Open your terminal in the backend folder and run:

```bash
npm start
```

## Expected Output

When the server starts successfully, you should see:

```
Server running on port 5000
MongoDB Connected: ac-5hcvx6.mongodb.net
```

---

## Common Issues & Solutions

### ❌ Error: `EADDRINUSE: address already in use :::5000`

**Problem:** The server is already running on port 5000.

**Solution:** Stop the existing server first:

```powershell
Get-Process -Name node | Stop-Process -Force
```

Then start again:
```bash
npm start
```

---

### ❌ Error: `querySrv ECONNREFUSED`

**Problem:** DNS cannot resolve MongoDB's SRV records.

**Solution:** Already fixed! The code in `config/db.js` uses Google DNS (8.8.8.8) to resolve this.

---

## How to Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## Verify Server is Running

Test the API endpoint:
```bash
curl http://localhost:5000
```

Expected response: `Academic Planner API is running`
