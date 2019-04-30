const functionLib = require('../functionlib/codehelper')

class  Topic{
    createTopic(databaseArrObj, objValues){
        this._val = objValues
        const validate = this.validateValues()
        if(validate.success === true){
            databaseArrObj.topic.push(this._val)
            return {
                message: 'data created!',
                success: true
            }
        } else {
            return validate
        }
    }

    validateValues(){
        if(this._val.description.length > 255){
            return {
                message: 'description length cannot be more than 255 characters!',
                success: false
            }
        } else {
            return {
                success: true
            }
        }
    }

    getTopics(databaseArrObjs){
        const Topics = databaseArrObjs.topic.sort((a,b)=>{ b[3] - a[3]})
        return Topics
    }

    updateTopic(databaseArrObj, objValues){
        if(functionLib.ObjectLength(databaseArrObj.topic) === 0){
            return {
                message: 'no data is available',
                error: true
            }
        }
        let updated = false
        return new Promise((resolve, reject) => {
            databaseArrObj.topic.forEach(element => {
                if(element.id === objValues.id) {
                    element.title = objValues.title
                    element.description = objValues.description
                    updated = true
                }
                resolve(updated)  
            })
        })
    }

    deleteData(databaseArrObj, objValues) {
        const indexDel = databaseArrObj.topic.findIndex(prop => prop.id === objValues.id)
        if(functionLib.ObjectLength(databaseArrObj.topic.splice(indexDel, 1)) > 0){
            return true
        } else{
            return false
        }
    }

    upVote(databaseArrObj, objValues){
        const indexUpVote = databaseArrObj.topic.findIndex(prop => prop.id === objValues.id)
        if(indexUpVote >= 0){
            databaseArrObj.topic[indexUpVote].upvote ++
            return true
        } else{
            return false
        }
    }

    downVote(databaseArrObj, objValues){
        const indexUpVote = databaseArrObj.topic.findIndex(prop => prop.id === objValues.id)
        if(indexUpVote >= 0){
            databaseArrObj.topic[indexUpVote].downvote ++
            return true
        } else{
            return false
        }
    }
}

module.exports = Topic