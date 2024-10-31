// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Setup middleware
app.use(cors());
app.use(express.json());

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Render login page
const callbackPath = '/print-jwt';
app.get('/', (req, res) => {
    res.render('index', {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        callbackUrl: callbackPath,
        title: process.env.PAGE_TITLE || 'Retrieve Google Sign-In JWT'
    });
});

// Auth endpoint
app.post(callbackPath, async (req, res) => {
    try {
        const { token } = req.body;

        res.json({
            success: true,
            token: token, // Original Google token
        });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
