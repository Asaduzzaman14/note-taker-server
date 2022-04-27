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


        // create api and read data
        app.get('/notes', async (req, res) => {
            const query = {}
            const cursor = noteCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // post data
        app.post('/note', async (req, res) => {
            const data = req.body
            const cursor = await noteCollection.insertOne(data)
            const result = cursor.toArray()
            res.send(result)
        })

        //  update data 

        app.put('/note/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body
            const filterId = { _id: ObjectId(id) }
            const options = { upsert: true }
            const newdata = {
                $set: { ...data }
            }
            const result = await noteCollection.updateOne(filterId, newdata, options)
            res.result(result)

        })


        // delete data 
        app.delete('/note/:id', (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await noteCollection.deleteOne(query)
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