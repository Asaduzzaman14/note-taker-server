const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

const port = process.env.PORT || 5000


// modelwear
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://noteTaker:LN6QXBHEnsRVolRL@cluster0.dci89.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const noteCollection = client.db('noteTaker').collection('note')

        app.get('/notes', async (req, res) => {
            const query = {}
            const cursor = noteCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })


    }
    finally {

    }

}
run().catch(console.dir)

















app.get('/', (req, res) => {
    res.send('note taker server is runing')
})
app.listen(port, () => {
    console.log('node taker servet is runing', port);
})