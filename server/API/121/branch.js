let db = require('../../Data/data')
let sql = require('mssql/msnodesqlv8');

exports.branchInfo = async function (req, res, next) {
    let data = null
    try {
        let pool = await sql.connect(db)
        data = await pool.request()
            .query('SELECT * FROM Department')
        sql.close()
        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}