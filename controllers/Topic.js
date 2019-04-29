require('../models/topic')
const uniqid = require('uniqid')
const faker = require('faker')
const { ObjectLength } = require('../functionlib/codehelper')

exports.Create = (req, res) => {
    let topic = {
        id: uniqid(),
        title: (req.body.title) ? req.body.title: faker.lorem.sentence(),
        description: (req.body.description) ? req.body.description: faker.lorem.sentences() 
    }
    database.topic.push(topic)
    res.status(200).json({
        message: 'Data added',
        success: true
    })
}

exports.Read = (req, res) => {
    data = database.topic
        res.status(200).json({
            message: 'data retrieved!',
            success: true,
            count: ObjectLength(data),
            data
        })
}

exports.Update = (req, res) => {
    let updated = false
    const updateData = new Promise((resolve, reject) => {
        database.topic.forEach(element => {
            if(element.id === req.body.id) {
                element.title = req.body.title
                element.description = req.body.description
                updated = true
            }
            resolve(updated)  
        })
    })

    updateData.then(resolve => {
        if(resolve){
            res.status(201).json({
                message: 'data updated!',
                data: database.topic
            })
        }
        else{
            res.status(400).json({
                message: 'data is not updated please check your topic id\'s!'
            })
        }
    })
    .catch(err => {
        res.status(503).json({
            message: err
        })
    })
}

exports.Delete = (req, res) => {
    const indexDel = database.topic.findIndex(prop => prop.id === req.body.id)
    database.topic.splice(indexDel, 1)
    
    res.status(200).json({
        message: 'data deleted!',
        data: database.topic
    })
}
