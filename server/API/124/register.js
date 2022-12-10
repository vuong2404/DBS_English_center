let db = require('../../Data/data')
let sql = require('mssql/msnodesqlv8');



exports.calcTotalPay = async function (req, res, next) {
    let data = null
    let valueID = req.param.id
    let valuePID = req.query.pid
    // let valueID = req.param.id
    // let valuePID = req.param.pid
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('c_id', sql.Char(7), req.param.id)
            .input('promotion_id', sql.Char(7), req.query.pid)
            //.output('result',sql.Int)
            .execute('calcTotalPay')

        sql.close()

        res.status(200).send(data.returnvalue)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}



exports.CheckApply = async function (req, res, next) {
    let data = null
    // let valueID = req.query.id
    // let valuePID = req.query.pid
    let valueID = req.param.id
    let valuePID = req.param.pid
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('c_id', sql.Char(7), valueID)
            .input('promotion_id', sql.Char(7), valuePID)
            .output('result',sql.Int)
            .execute('CheckApply')
        sql.close()

        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}

exports.calcReduce = async function (req, res, next) {
    let data = null
    let valueID = req.query.id
    let valuePID = req.query.pid
    // let valueID = req.param.id
    // let valuePID = req.param.pid
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .input('c_id', sql.Char(7), valueID)
            .input('promotion_id', sql.Char(7), valuePID)
            .output('result',sql.Int)
            .execute('calcTotalPay')
        sql.close()

        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}

