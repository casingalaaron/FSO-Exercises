const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb://casingalaaron04_db_user:${password}@ac-d92phim-shard-00-00.pyfduwk.mongodb.net:27017,ac-d92phim-shard-00-01.pyfduwk.mongodb.net:27017,ac-d92phim-shard-00-02.pyfduwk.mongodb.net:27017/?ssl=true&replicaSet=atlas-10wh0m-shard-0&authSource=admin&appName=Cluster0`

mongoose.connect(url, {family : 4})

const name = process.argv[3]
const number = process.argv[4]

const notePersons = new mongoose.Schema({
    name : String,
    number : String
})
const Person = mongoose.model('Person', notePersons)

const person = new Person({
    name : name,
    number : number
})

if(process.argv.length === 3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
else if(process.argv.length !== 5){
    console.log('give name and number as 4th and 5th argument to add collection')
    process.exit(1)
}
else if(process.argv.length === 5){
    person.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
