const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Environment variables
const API_URL = process.env.API_URL;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

let client;

// MongoDB connection setup
const connectToMongo = async () => {
    if (!client) {
        client = await MongoClient.connect(MONGO_URI);
    }
    return client.db(DB_NAME);
};

// Fetch ticker data from external API
const fetchTickers = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
};

// Save ticker data to MongoDB
const saveToMongo = async (data) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection(COLLECTION_NAME);
        await collection.deleteMany({});
        await collection.insertMany(data);
        console.log('Tickers data saved to MongoDB');
    } catch (err) {
        console.log(err);
    }
};

// Retrieve ticker data from MongoDB
const getFromMongo = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection(COLLECTION_NAME);
        const data = await collection.find({}).toArray();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

// Save top 10 tickers to MongoDB
const save = async () => {
    try {
        const tickers = await fetchTickers();
        if (!tickers) {
            throw new Error('Data not found');
        }
        // Process fetched data and select top 10 tickers
        const tickerArray = Object.entries(tickers).map(([symbol, data]) => ({
            name: data.name,
            last: parseFloat(data.last),
            buy: parseFloat(data.buy),
            sell: parseFloat(data.sell),
            volume: parseFloat(data.volume),
            base_unit: data.base_unit,
        }));
        tickerArray.sort((a, b) => b.last - a.last);
        const top10 = tickerArray.slice(0, 10);
        // Save top 10 tickers to MongoDB
        await saveToMongo(top10);
        return top10;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Route to fetch and return top 10 tickers
app.get('/api/top10tickers', async (req, res) => {
    try {
        const data = await save();
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error occurred while fetching top 10 tickers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch and return all tickers from MongoDB
app.get('/api/dbtickers', async (req, res) => {
    try {
        const data = await getFromMongo();
        if (!data) {
            res.status(500).json({ error: 'Failed to fetch data from database' });
            return;
        }
        res.json(data);
    } catch (err) {
        console.log('Error in fetching data from mongo', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
