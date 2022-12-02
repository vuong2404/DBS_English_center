let db = require('../../Data/data')
let sql = require('mssql/msnodesqlv8');

exports.viewCourse = async function (req, res, next) {
    let data = null
    let name = req.query.name
    try {
        let pool = await sql.connect(db);
        if (name) {
            data = await pool.request()
                .query(`SELECT * FROM Course WHERE c_name LIKE \'%${name}%\'`)
            sql.close()
            res.status(200).send(data.recordsets)

        }
        else {
            data = await pool.request()
                .query('SELECT * FROM Course')
            sql.close()
            res.status(200).send(data.recordsets)
        }
    }
    catch (err) {
        console.log('err: ', err)
        res.send(err)
    }
}

exports.addCourse = async function (req, res, next) {
    let data = req.body
    try {
        let pool = await sql.connect(db);
        data = await pool.request()
            .input('c_ID', sql.Char(7), data.c_ID)
            .input('c_name', sql.NVarChar(50), data.c_name)
            .input('fee', sql.Int, data.fee)
            .input('s_date', sql.Date, data.s_date)
            .input('e_date', sql.Date, data.e_date)
            .input('fk_syl_ID', sql.Char(7), data.fk_syl_ID)
            .input('fk_dnum', sql.Char(7), data.fk_dnum)
            .execute('insertCourse')
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
        res.send(err)
    }
}

exports.putCourse = async function (req, res, next) {
    let c_ID = req.params.id
    let data = req.body
    try {
        let pool = await sql.connect(db);
        data = await pool.request()
            .input('c_ID', sql.Char(7), c_ID)
            .input('c_name', sql.NVarChar(50), data.c_name)
            .input('fee', sql.Int, data.fee)
            .input('s_date', sql.Date, data.s_date)
            .input('e_date', sql.Date, data.e_date)
            .input('fk_syl_ID', sql.Char(7), data.fk_syl_ID)
            .input('fk_dnum', sql.Char(7), data.fk_dnum)
            .execute('updateCourse')
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
        res.send(err)
    }
}

exports.deleteCourse = async function (req, res, next) {
    let c_ID = req.params.id
    try {
        let pool = await sql.connect(db);
        data = await pool.request()
            .input('c_ID', sql.Char(7), c_ID)
            .execute('deleteCourse')
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
        res.send(err)
    }
}
