import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mock data storage (in production, use a real database)
const messages = [];

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Store message
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    console.log('New contact message:', newMessage);

    res.json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/messages', (req, res) => {
  res.json({ messages });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
