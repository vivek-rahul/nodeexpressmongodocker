const express = require('express')
const app = express()
const mongoose = require('mongoose');
const userModel = require('./user-schema')

app.use(express.json());
// app.use(express.urlencoded())

// MONGOOSE CONNECTION
// mongoose.set('strictQuery', false);
const url = 'mongodb://mongodb:27017/test'
mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("err", err);
})
mongoose.connection.on('error', (err) => {
    console.log(err);
})

//API
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.post('/create', async (req, res) => {
    let { name, age } = req.body;
    console.log("name, age", name, age);
    const createUser = await userModel.create({
        name: name,
        age: age
    }).then((e) => {
        return res.json({
            success: true,
            message: 'User created',
            data: e
        })
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'fail',
            data: err
        })
    })
})

app.get('/get', async (req, res) => {

    const getData = userModel.find().exec((err, data) => {

        if (err) return res.json({
            success: false,
            message: 'Fail',
            data: err
        })

        return res.json({
            success: true,
            message: 'Data fetched',
            data: data
        })

    })
})
// START SERVER
app.listen(3000, () => {
    console.log("server started in 3000");
})

