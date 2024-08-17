const express =require('express')
const app=express() 
const { MongoClient, ServerApiVersion } = require('mongodb');
const port= process.env.PORT || 3004 
require('dotenv').config()
const cors=require('cors') 


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pppehle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // shiha
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
const productCollection=client.db('laptopdb').collection('laptopcollection')

app.get('/laptop',async(req,res)=>{
    const allData= await productCollection.find().toArray() 
    res.send(allData)
})


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('my app is running')
}) 
app.listen(port,()=>{
    console.log('this app is running on this port',port)
})