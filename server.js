import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import loginHandler from './api/login.js';
import registerHandler from './api/register.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// API routes
app.post('/api/login', (req, res) => {
  // Adapt the serverless handler to Express
  const mockReq = { method: 'POST', body: req.body };
  const mockRes = {
    status: (code) => ({
      json: (data) => res.status(code).json(data)
    })
  };
  loginHandler(mockReq, mockRes);
});

app.post('/api/register', (req, res) => {
  const mockReq = { method: 'POST', body: req.body };
  const mockRes = {
    status: (code) => ({
      json: (data) => res.status(code).json(data)
    })
  };
  registerHandler(mockReq, mockRes);
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});