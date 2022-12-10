let db = require("../../Data/data");
let sql = require("mssql/msnodesqlv8");

exports.calcTotalPay = async function (req, res, next) {
  let respone = {};
  // let valueID = req.query.id
  // let valuePID = req.query.pid
  let valueID = req.query.id;
  let valuePID = req.query.pid;
  try {
    let pool = await sql.connect(db);
    data1 = await pool
      .request()
      .input("c_id", sql.Char(7), valueID)
      .input("promotion_id", sql.Char(7), valuePID)
      .execute("CheckApply");

    respone.result = data1.returnValue;

    if (data1.returnValue === 0) {
      return res.status(200).send({
        ...respone,
        message: "Mã khuyến mãi không thể áp dụng cho khoá học này",
      });
    } else {
      pool = await sql.connect(db);
      let data2 = await pool
        .request()
        .input("c_id", sql.Char(7), valueID)
        .input("promotion_id", sql.Char(7), valuePID)
        .execute("calcTotalPay");
      respone.totalPay = data2.returnValue;

      pool = await sql.connect(db);
      let data3 = await pool
        .request()
        .input("c_id", sql.Char(7), valueID)
        .input("promotion_id", sql.Char(7), valuePID)
        .execute("calcReduce");

      return res.send({
        ...respone,
        reduce: data3.returnValue,
        message: `Áp dụng thành công mã giảm giá ${valuePID} cho khoá học ${valueID}`
      });
    }

    sql.close();
  } catch (err) {
    console.log("err: ", err);
    res.status(400).send(err);
  }
};

// exports.calcReduce = async function (req, res, next) {
//   let data = null;
//   let valueID = req.query.id;
//   let valuePID = req.query.pid;
//   // let valueID = req.param.id
//   // let valuePID = req.param.pid
//   try {
//     let pool = await sql.connect(db);
//     data = await pool
//       .request()
//       .input("c_id", sql.Char(7), valueID)
//       .input("promotion_id", sql.Char(7), valuePID)
//       .output("result", sql.Int)
//       .execute("calcTotalPay");
//     sql.close();

//     res.status(200).send(data.recordsets);
//   } catch (err) {
//     console.log("err: ", err);
//     res.status(400).send(err);
//   }
// };
