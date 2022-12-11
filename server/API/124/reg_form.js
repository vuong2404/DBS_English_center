let db = require("../../Data/data");
let sql = require("mssql/msnodesqlv8");

exports.viewReg = async function (req, res, next) {
    let data = null
    try {
        let pool = await sql.connect(db);
        data = await pool.request()
            .query('SELECT * FROM Reg_form')
        sql.close()
        res.status(200).send(data.recordsets)
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}
exports.addReg = async function (req, res, next) {
    let data = req.body
    let id = req.params.id
    try {
        let pool = await sql.connect(db);
        data = await pool.request()
            .input('form_ID', sql.Char(7), id)
            .input('fk_c_ID', sql.Char(6), data.fk_c_ID)
            .input('fk_stu_ID', sql.Char(7), data.fk_stu_ID)
            .execute('addRegFORM')
        sql.close()
        if (data.returnValue == 0) {
            res.status(200).send({ "returnValue": data.returnValue })
        }
        else {
            res.status(400).send({ "returnValue": data.returnValue, "message": "Phiếu đăng kí này đã tồn tại" })
        }
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}

exports.updateReg = async function (req, res, next) {
    let data = req.body
    let id = req.params.id
    try{
        let pool = await sql.connect(db);
        data = await pool.request()
            .input('form_ID', sql.Char(7), id)
            .input('statusUpdate', sql.Int, data.statusUpdate)
            .execute('updateStatusReg')
        sql.close()
        if (data.returnValue == 0) {
            res.status(200).send({ "returnValue": data.returnValue })
        }
        else {
            res.status(400).send({ "returnValue": data.returnValue, "message": "Cập nhập phiếu đăng ký không thành công" })
        }
    }
    catch (err) {
        console.log('err: ', err)
        res.status(400).send(err)
    }
}