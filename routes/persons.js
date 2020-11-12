const person = require('../models/person')
const express = require('express');
const router = express.Router()

router.post('/', (req,res)=> {
    let info = req.body ;
    let newPerson = new person(info);
    newPerson.save()
    .then(person => res.send(person))
    .catch(err=> console.log(err.message))


})

// router.get('/', (req,res)=> {
//     const per = person.find()
//     res.status(200).json({msg:'hello', per})

// })

router.get("/", (req, res) => {
    person.find()
      .then(person => res.send(person))
      .catch(err => console.log(err));
  });

router.get("/id/:id", async (req, res) => {
  // let {_id} = req.params ;
  person.findById(req.params.id)
    .then(person => res.send(person))
    .catch(err => console.log(err));
});

router.delete("/id/:id", async (req, res) => {
  // let {_id} = req.params ;
  person.findByIdAndRemove(req.params.id)
    .then(response => res.send('one person has been deleted from the DB having an ID :' + req.params.id))
    .catch(err => console.log(err));
});

router.put("/name/:name", async (req, res) => {
  // let {_id} = req.params ;
  person.findOneAndUpdate({name :req.params.name} , {$set : req.body} ,{new: true,                       
    runValidators: true} )
    .then(person => res.status(200).send(person))
    .catch(err => console.log(err));
});



router.post('/manyPeople', async (req,res)=> {
  let info = req.body ;
  person.create(info)
  .then( manyPeople=> res.send(manyPeople))
  .catch(err => console.log(err))
})


router.delete('/manyPeople/:name', async (req,res)=> {
  let {name} = req.params
  person.remove({name})
  .then( person=> res.send({NumberOfPersonDeleted: person.deletedCount}))
  .catch(err => console.log(err))
})


router.get('/name/:name', async (req,res)=> {
  let { name } = req.params ;
  person.find({name})
      .then(person => res.send(person))
      .catch(err => console.log(err));
})


router.get('/favouriteFoods/:favouriteFoods', async (req, res) => {
  person.findOne({favoriteFoods: req.params.favouriteFoods })
  .then(person => res.send(person))
  .catch(err => console.log(err.message))
})

router.put('/favouriteFoods/:id', async(req,res)=>{
  person.findById(req.params.id) 
      .then(person => {
          person.favoriteFoods.push(req.body.favoriteFoods)

          person.save()
              .then(updated => res.send({msg :'upadated',updated}))
              .catch(err => console.log(err.message))
      }
          )
      .catch(err => console.log(err.message))
})



module.exports = router