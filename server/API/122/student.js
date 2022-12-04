let db = require('../../Data/data')
let sql = require('mssql/msnodesqlv8');

exports.viewStudent = async function (req, res, next) {
    let data = null
    let name = req.query.name
    if (name) {
        try {
            let pool = await sql.connect(db)
            data = await pool.request()
                .input('name', sql.NVarChar(50), name)
                .execute('searchStudentInfo')
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
                .execute('sumaryStudentInfo')
            sql.close()
            res.status(200).send(data.recordsets)
        }
        catch (err) {
            console.log('err: ', err)
            res.status(400).send(err)
        }
    }
}

exports.updateStudent = async function (req, res, next) {
    let data = null
    let ID = req.params.id
    let studentInfo = req.body
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('stu_ID', sql.Char(7), ID)
            .input('fname', sql.NVarChar(15), studentInfo.fname)
            .input('minit', sql.NVarChar(15), studentInfo.minit)
            .input('lname', sql.NVarChar(15), studentInfo.lname)
            .input('bdate', sql.Date, studentInfo.bdate)
            .input('address', sql.NVarChar(100), studentInfo.address)
            .input('email', sql.NVarChar(50), studentInfo.email)
            .execute('updateStudentInfo')
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

exports.deleteStudent = async function (req, res, next) {
    let data = null
    let ID = req.params.id
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('stu_ID', sql.Char(7), ID)
            .execute('deleteStudent')
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

exports.sortStudent = async function (req, res, next) {
    let data = null
    let keySearch = req.query.key
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('property', sql.NVarChar(50), keySearch)
            .execute('sortStudentInfo')
        sql.close()

        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}