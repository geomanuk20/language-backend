import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const { text, source, target } = req.query;
        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();
        const matches = json.matches;
        const translatedText = matches[matches.length - 1].translation || 'No translation found';
        res.send(translatedText);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!');
    }
});

const PORT = process.env.PORT || 5000; // Fallback to 5000 if .env not loaded

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});