const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_URL = process.env.API_URL;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

let client;

const connectToMongo = async () => {
    if (!client) {
        client = await MongoClient.connect(MONGO_URI);
    }
    return client.db(DB_NAME);
};

const fetchTickers = async () => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
};

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

const save = async () => {
    try {
        const tickers = await fetchTickers();
        if (!tickers) {
            throw new Error('Data not found');
        }
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
        await saveToMongo(top10);
        return top10;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
