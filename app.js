const express = require('express')
const  mongoose  = require('mongoose')
const app = express()
const persons =require('./routes/Untitled-1')
const port = 6500;


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/contact',{ useNewUrlParser: true ,  useUnifiedTopology: true  })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


// app.get("/api/persons", (req, res) => {
//     res.status(200).json(persons);
//   });


// app.post("/api/persons", (req, res) => {
// let newPerson = { ...req.body};
// persons.push(newPerson);
// res.status(200).json({
//     msg: "User added with success",
//     persons,
// });
// });

app.use('/', persons )

app.listen(port, (err) => {
    err
        ? console.log(err)
        : console.log(`the server is running on port ${port}...`);
    });
