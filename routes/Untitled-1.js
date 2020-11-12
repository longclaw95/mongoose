const express = require('express')
const person = require('../models/person')
const router = express.Router()

// Create and Save a Record of a Model
router.post('/', async (req,res)=>{
    let info = req.body ;
    let newPerson = new person(info)
    newPerson.save()
    .then(person => res.send(person))
    .catch(err => console.log(err))
})


// Create Many Records with model.create()

router.post('/manyPeople' , async (req,res) => {
    let info = req.body ;
     person.create(info)
    .then(person => res.send(person))
    .catch(err => console.log(err))

})

// Use model.find() to Search Your Database

router.get('/name/:name', async (req, res) => {
    let {name} = req.params.name
    person.find({name})
    .then(person=> res.send(person))
    .catch(err => console.log(err))

})

// Use model.findOne() to Return a Single Matching Document from Your Database

router.get('/favouriteFoods/:favouriteFoods', async (req,res)=> {
    person.findOne({favoriteFoods : req.params.favouriteFoods})
    .then(person => res.send(person))
    .catch(err => console.log(err))
})

// Use model.findById() to Search Your Database By _id

router.get('/id/:id', async (req, res)=>{
    // let {_id} = req.params.id ;
    person.findById( req.params.id)
    .then(person => res.send(person))
    .catch(err => console.log(err) )
})

// Perform Classic Updates by Running Find, Edit, then Save

router.put('/favouriteFoods/:id', async(req, res)=>{
    person.findById(req.params.id)
    .then( person => {
        person.favoriteFoods.push(req.body.favouriteFoods);
        person.save()
        .then(person=> res.send({msg :'updated',person}))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// Perform New Updates on a Document Using model.findOneAndUpdate()

router.put('/name/:name', async (req,res)=>{
    person.findOneAndUpdate({name : req.params.name},
        {
        $set : req.body
    },
    {
        new : true ,
        runValidators : true
    })
    .then(person => res.send(person))
    .catch(err=>console.log(err))
})

router.delete('/id/:id', async(req,res)=> {
    person.findByIdAndRemove(req.params.id)
    .then(response => res.send('a person having and ID :' + req.params.id + 'has been deleted'))
    .catch(err => console.log(err))
})


// MongoDB and Mongoose - Delete Many Documents with model.remove()

router.delete('/name/:name', async (req,res)=> {
    person.remove({name : req.params.name})
    .then(person=> res.send({NumberOfPersonDeleted: person.deletedCount}))
    .catch(err => console.log(err))
})

//   Chain Search Query Helpers to Narrow Search Results

router.get('/sortingWithFood/:favouriteFoods', async(req,res)=>{
    person.find({favoriteFoods : req.params.favouriteFoods})
    .sort({name : 1})
    .limit(2)
    .select({age : false})
    .exec((err,persons)=>{
        if (err) console.log(err)
        else res.send(persons)
    })
})

module.exports = router