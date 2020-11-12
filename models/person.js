const mongoose = require('mongoose');

const personSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    favoriteFoods : {
        type : [String]
    }
})
const Person = mongoose.model('Person', personSchema)

// Person.create([{ name: 'Will Riker' , age:25,favoriteFoods:['pizza','couscous']},
//  { name: 'Geordi LaForge', age:26 ,favoriteFoods:['lablebi','couscous'] },
//  { name: 'Yahia Akermi', age:28 ,favoriteFoods:['mlou5iya','loubya'] }]
//  );
 
module.exports = Person