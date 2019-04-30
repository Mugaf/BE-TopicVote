//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
// uses to keep a response data
let arrRes = null

chai.use(chaiHttp);
//Our parent block
describe('Topic', () => {
  describe('/POST Topic', () => {
    it('should create 5 topic data\'s', (done) => {
      for (let index = 0; index < 5; index++) {
        beforeEach((done) => { // Before each test we adding couple of values
          chai.request(server)
            .post('/api/topic')
            .end((err, res) => {
              res.should.have.status(200)
              done()
            })
        })
      }
      done()
    })
  })
  
  // select for arrRes varable value on next testing
  beforeEach((done) => {
    chai.request(server)
      .get('/api/topic')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        arrRes = res.body.data
        done()
      })
  })

  describe('/GET topics', () => {
    it('it should GET all the topics and return 200 as code status', (done) => {
      chai.request(server)
        .get('/api/topic')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          arrRes = res.body.data
          arrRes.forEach(element => {
            element.should.have.property('id')
            element.should.have.property('title')
            element.should.have.property('description')
            element.should.have.property('downvote')
            element.should.have.property('upvote')
            element.upvote.should.equal(0)
            element.downvote.should.equal(0)
          })
          // check is it already get all of 5 data or not
          res.body.data.length.should.equal(5)
          done()
        })
    })
  })

  describe('/PUT topic', () => {
    it('should update the data and returning 200 as the status code', (done) => {
        const objUpdater = {
          id: arrRes[0].id,
          title: 'Code Error on service worker',
          description: 'i already try every solution that my manager said, but still the problem is still appears.'

        }
        chai.request(server)
          .put('/api/topic')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(objUpdater)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.success.should.equal(true)
            res.body.data[0].title.should.equal(objUpdater.title)
            res.body.data[0].description.should.equal(objUpdater.description)
          })
        done()
      })
  })
  describe('/UPVOTE Topic', () => {
    it('should upvote a topic and give 200 status code', done => {
      chai.request(server)
      .put('/api/topic/upvote')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(arrRes[0])
      .end((err, res) => {
        res.should.have.status(200)
      })
      done()
    })
  })
  describe('/DOWNVOTE Topic', () => {
    it('should downvote a topic and give 200 status code', done => {
      chai.request(server)
      .put('/api/topic/downvote')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(arrRes[0])
      .end((err, res) => {
        res.should.have.status(200)
      })
      done()
    })
  })
  describe('/DELETE Topic', () => {
    it('should delete a topic', done => {
      chai.request(server)
      .delete('/api/topic')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(arrRes[0])
      .end((err, res) => {
        res.should.have.status(200)
      })
      done()
    })
  })
})