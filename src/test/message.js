require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa' // 12 byte string
const SAMPLE_OBJECT_ID_2 = 'aaaaaaaaaaaa' // 12 byte string

describe('Message API endpoints', () => {
    const sampleUser = new User({
        username: 'myuser',
        password: 'mypassword',
        _id: SAMPLE_OBJECT_ID
    })

    const sampleMessage = new Message({
        title: 'Example',
        body: 'Yoo',
        author: SAMPLE_OBJECT_ID,
        _id: SAMPLE_OBJECT_ID_2
    })

    Promise.all([sampleUser.save(), sampleMessage.save()])
    .then(() => {
        done()
    })
    })

    afterEach((done) => {
        // TODO: add any afterEach code here
        deletion1 = User.deleteMany({'username':['myuser']})
        deletion2 = Message.deleteMany({_id: [SAMPLE_OBJECT_ID_2]})
        Promise.all([deletion1, deletion2]).then(()=>{
            done()
        })
    })

     it('should load all messages', (done) => {
    //     // TODO: Complete this
            chai.request(app)
            .get('/messages')
            .end((error, response) => {
            // .send({username: 'siko408', password: 'mypassword'})
           // User.findOne({username: 'siko408'}).lean().then(user => {
               done()
               // expect(user).to.be.an('object')
               // chai.request(app)
               // .post('/messages')
               // .send({title: 'nothing', body: 'here', author:user})
               //   console.log("Response from messages", user)
               //  chai.request(app)
               //  .get('/messages')
               //  .end((error, response) => {
               //      console.log("sucess", response)
               //          done()
               //              })
               //      .catch(err)


           // })




     })

 })

    it('should get one specific message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get(`/messages/${SAMPLE_OBJECT_ID}`)
        .end((error, response) => {

            done()

 })
    })

    it('should post a new user', (done) => {
        User.findOne({username: "siko408"}).lean().then(user =>{
            chai.request(app)
            .post('/messages')
            .send({title: 'PARTYYYY!', body: 'WOOOO', author:user})
            .end((err, res) => {
                if (err) { done(err) }
                // check that user is actually inserted into database
                Message.findOne({author: user}).then(user => {
                     expect(user).to.be.an('object')
                    done()
                })
            })
        })

    })

    it('should update a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/messages/${SAMPLE_OBJECT_ID}`, {body:"This will be the new update"})
        .end((error, response) => {
            done()
            })
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .delete(`/messages/5ea217f8040f80402365cb5c`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal('5ea217f8040f80402365cb5c')
            // check that user is actually deleted from database
            Message.findOne({username: 'myuser'}).then(user => {
                expect(user).to.equal(null)
                done()
            })
        })
    })
