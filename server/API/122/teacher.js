let db = require('../../Data/data')
let sql = require('mssql/msnodesqlv8');

exports.viewTeacher = async function (req, res, next) {
    let data = null
    let name = req.query.name
    if (name) {
        try {
            let pool = await sql.connect(db)
            data = await pool.request()
                .input('name', sql.NVarChar(50), name)
                .execute('searchTeacherInfo')
            sql.close()
            res.status(200).send(data.recordsets)

        }
        catch (err) {
            console.log('err: ', err)
            res.status(400).send(err)
        }
    }
    else {
        try {
            let pool = await sql.connect(db)
            data = await pool.request()
                .input('numberCourse', sql.Int, 0)
                .execute('sumaryTeacherInfo')
            sql.close()
            res.status(200).send(data.recordsets)
        }
        catch (err) {
            console.log('err: ', err)
            res.status(400).send(err)
        }
    }
}

exports.updateTeacher = async function (req, res, next) {
    let data = null
    let ID = req.params.id
    let teacherInfo = req.body
    console.log(ID)
    console.log(teacherInfo)
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('teacher_ID', sql.Char(7), ID)
            .input('fname', sql.NVarChar(15), teacherInfo.fname)
            .input('minit', sql.NVarChar(15), teacherInfo.minit)
            .input('lname', sql.NVarChar(15), teacherInfo.lname)
            .input('bdate', sql.Date, teacherInfo.bdate)
            .input('address', sql.NVarChar(100), teacherInfo.address)
            .input('email', sql.NVarChar(50), teacherInfo.email)
            .input('salary', sql.Int, teacherInfo.salary)
            .execute('updateTeacherInfo')
        sql.close()
        if (data.returnValue === 0) {
            res.status(200).send({ "returnValue": data.returnValue })
        }
        else {
            res.status(400).send({ "returnValue": data.returnValue })
        }
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}

exports.deleteTeacher = async function (req, res, next) {
    let data = null
    let ID = req.params.id
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('teacher_ID', sql.Char(7), ID)
            .execute('deleteTeacher')
        sql.close()

        if (data.returnValue == 0) {
            res.status(200).send({ "returnValue": data.returnValue })
        }
        else {
            res.status(400).send({ "returnValue": data.returnValue })
        }
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}

exports.sortTeacher = async function (req, res, next) {
    let data = null
    let keySearch = req.query.key
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('property', sql.NVarChar(50), keySearch)
            .execute('sortTeacherInfo')
        sql.close()

        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}