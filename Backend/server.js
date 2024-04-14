const express=require('express');
const axios=require('axios');
const app=express();
const {MongoClient}=require('mongodb');
const API_URL='https://api.wazirx.com/api/v2/tickers'
const MONGO_URI='mongodb+srv://user:1234@cluster0.oe2xykv.mongodb.net/'
const DB_NAME='tickersDB'
const COLLECTION_NAME='tickers'
const cors = require('cors');

app.use(cors());


const tickerSchema ={
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
};


const fetchTickers=async()=>{
    try{
        const response=await axios.get(API_URL);
        const data=response.data;
        return data
    }catch(err){
        console.log(err);
    }
}


const saveToMongo=async(data)=>{
  try{
    const client=await MongoClient.connect(MONGO_URI);
    await client.connect();
    const db=client.db(DB_NAME);
    const collection=db.collection(COLLECTION_NAME);
    // await collection.insertMany(data.map(item => new tickerSchema(item)));
    await collection.insertMany(data);
    console.log('Tickers data saved to MongoDB');
    client.close();
  }catch(err){
    console.log(err);
    // res.status(500).json('Internal Server error mongo')
  }
}

const getFromMongo=async()=>{
  try{
    const client=await MongoClient.connect(MONGO_URI);
    const db=client.db(DB_NAME);
    const collection=db.collection(COLLECTION_NAME);
    const data=await collection.find({}).toArray();
    client.close();
    return data;
  }catch(err){
    console.log(err);
    return err;
  }
}


const deleteFromMongo=async()=>{

  try{
    const client=await MongoClient.connect(MONGO_URI);
    const db=client.db(DB_NAME);
    const collection=db.collection(COLLECTION_NAME);
    await collection.deleteMany({});
    client.close();
  }catch(err){
    console.log(err);
  }
}


const save=async()=>{
  try{
      const tickers=await fetchTickers();
      if(!tickers){
        res.status(404).json({message:'Data not found'})
        return;
      }
      const tickerArray=Object.entries(tickers).map(([symbol,data])=>({
        name:data.name,
        last: parseFloat(data.last),
        buy: parseFloat(data.buy),
        sell: parseFloat(data.sell),
        volume: parseFloat(data.volume),
        base_unit:data.base_unit,
      }));
      tickerArray.sort((a,b)=>b.last-a.last);
      const top10=tickerArray.slice(0,10);
      // console.log(top10);
      await deleteFromMongo();
      await saveToMongo(top10);
      return top10;
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
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


app.get('/api/dbtickers',async(req,res)=>{
  try{
    await save();
    const data=await getFromMongo();
    if(!data){
      res.status(500).json({ error: 'Failed to fetch data from database' });
      return;
    }
    res.json(data);
  }catch(err){
    console.log('Error in fetching data from mongo',err);
    res.status(500).json({ error: 'Internal server error' });
  };
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});