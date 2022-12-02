let server = require('express');
let cors = require('cors')
let bodyParse = require('body-parser');
let course = require('./API/121/course')

// Create a router
let router = server.Router()
router.use(bodyParse())

function Result(req, res) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} `, res.statusCode)
}


// course API
router.route('/course')
    .get(async function (req, res, next) {       // View all course  -- API example: http://localhost:3003/course   
        await course.viewCourse(req, res, next)  // Search course by name  -- API example http://localhost:3003/course?name=English
        Result(req, res)
    })
    .post(async function (req, res, next) {     // Add course  -- API example: http://localhost:3003/course + body
        await course.addCourse(req, res, next)
        Result(req, res)
    })

router.route('/course/:id')
    .put(async function (req, res, next) {      // Update course  -- API example: http://localhost:3003/course/LA1004 + body
        await course.putCourse(req, res, next)
        Result(req, res)
    })
    .delete(async function (req, res, next) {   // Delete course  -- API example: http://localhost:3003/course/LA1004 
        await course.deleteCourse(req, res, next)
        Result(req, res)
    })




// use the router
let app = server()
    .use(cors({
        origin: 'http://localhost:3000'
    })
    )
    .use('', router)
    .listen(3003, function () {
        console.log(`Server running on port ${app.address().port}`)
    })

