const Topic = require('../models/topic')
const uniqid = require('uniqid')
const faker = require('faker')
const { ObjectLength } = require('../functionlib/codehelper')
let ClassTopic = new Topic()

exports.Create = (req, res) => {
    let topic = {
        id: uniqid(),
        title: (req.body.title) ? req.body.title: faker.lorem.sentence(3, 5),
        description: (req.body.description) ? req.body.description: faker.lorem.sentence(5, 50),
        upvote: 0,
        downvote: 0
    }
    const Create = ClassTopic.createTopic(database, topic)
    const statusCode = (Create.success === false)?406:200
    res.status(statusCode).json(Create)
}

exports.Read = (req, res) => {
    data = ClassTopic.getTopics(database)
        res.status(200).json({
            message: 'data retrieved!',
            success: true,
            count: ObjectLength(data),
            data
        })
}

exports.Update = (req, res) => {
    let response
    let updateTopic = ClassTopic.updateTopic(database, req.body)
    if (updateTopic.error){
        return res.status(203).json(updateTopic)
    }
    updateTopic.then(resolve => {
        if(resolve){
            return res.status(200).json({
                message: 'data updated!',
                success: true,
                error: false,
                data: database.topic
            })
        }
        else{
            return res.status(400).json({
                message: 'data is not updated please check your topic id\'s!',
                success: false,
                error: false
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err,
            error: true
        })
    })
}

exports.Delete = (req, res) => {
    const delResult = ClassTopic.deleteData(database, req.body)
    if(delResult){
        res.status(200).json({
            message: 'data deleted!',
            data: database.topic
        })
    } else{
        res.status(400).json({
            message: 'no data deleted!',
        })
    }
}

exports.Upvote = (req, res) => {
    const upvote = ClassTopic.upVote(database, req.body)
    const message = (upvote)?`${req.body.id} upvoted!`:`${req.body.id} not found!`
    const statusCode = (upvote)?200:404
    res.status(statusCode).json({
        message: message
    })
}

exports.Downvote = (req, res) => {
    const downvote = ClassTopic.downVote(database, req.body)
    const message = (downvote)?`${req.body.id} downvoted!`:`${req.body.id} not found!`
    const statusCode = (downvote)?200:404
    res.status(statusCode).json({
        message: message
    })
}

