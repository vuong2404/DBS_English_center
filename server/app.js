let server = require('express')
let cors = require('cors')
let bodyParse = require('body-parser')
let course = require('./API/121/course')
let branch = require('./API/121/branch')
let syll = require('./API/121/syllabus')
let student = require('./API/122/student')
let course2 = require('./API/124/course2')

// Create a router
let router = server.Router()
router.use(bodyParse())

function Result(req, res) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} `, res.statusCode)
}


// course API (api for question a)
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

router.route('/branch')
    .get(async function(req, res, next) {      // Get branch table  -- API example: http://localhost:3003/branch
        await branch.branchInfo(req, res, next)
        Result(req, res)
    })

router.route('/syll')                         // Get syllabus table  -- API example: http://localhost:3003/syll
    .get(async function(req, res, next){
        await syll.syllInfo(req, res, next)
        Result(req, res)
    })

// student API (api for question b)
router.route('/student')
    .get(async function (req, res, next) {         // View student info  -- API example: http://localhost:3003/student
        await student.viewStudent(req, res, next) // Search student by name -- API example: http://localhost:3003/student?name=Phạm 
        Result(req, res)
    })

router.route('/student/:id')
    .put(async function (req, res, next) {           // Update student info  -- API example: http://localhost:3003/student/STU1003 + body  
        await student.updateStudent(req, res, next)
        Result(req, res)
    })
    .delete(async function (req, res, next) {
        await student.deleteStudent(req, res, next) // Delete student -- API example: http://localhost:3003/student/STU1003
        Result(req, res)
    })

router.route('/student/sort')
    .get(async function (req, res, next) {          // Sort student by attribute -- API example: http://localhost:3003/student/sort?key=Name
        await student.sortStudent(req, res, next)
        Result(req, res)
    })

// course2 API (api for question c)
router.route('/course2')
    .get(async function (req, res, next) {       // View all course  -- API example: http://localhost:3003/course   
        await course.viewCourse(req, res, next)  // Search course by name  -- API example http://localhost:3003/course?name=English
        Result(req, res)
    })
    .post(async function (req, res, next) {     // Add course  -- API example: http://localhost:3003/course + body
        await course.addCourse(req, res, next)
        Result(req, res)
    })

router.route('/course2/:id')
    .put(async function (req, res, next) {      // Update course  -- API example: http://localhost:3003/course/LA1004 + body
        await course.putCourse(req, res, next)
        Result(req, res)
    })
    .delete(async function (req, res, next) {   // Delete course  -- API example: http://localhost:3003/course/LA1004 
        await course.deleteCourse(req, res, next)
        Result(req, res)
    })
router.route('/course2/calcpay')     // id: ma khoa hoc, pid: ma khuyen mai
    .get(async function (req, res, next) {   // get money after using promotion  -- API example: http://localhost:3003/course2/calcpay?id=la1004&pid=d2p2
        await course2.calcTotalPay(req, res, next)
        Result(req, res)
    })


// use the router
let app = server()
    .use(cors({
        origin: 'http://localhost:3000'
    })
    )
    .use('', router)
    .listen(process.env.PORT || 3003, function () {
        console.log(`Server running on port ${app.address().port}`)
    })

