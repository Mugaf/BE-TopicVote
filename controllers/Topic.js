require('../models/topic')
const uniqid = require('uniqid')
const faker = require('faker')
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
    database.topic.forEach(element => {
      if(element.id === req.body.id) {
          element.title = req.body.title
          element.description = req.body.description

          res.status(200).json({
              message: 'data updated!',
              data: database.topic
          })
      }  
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
