const pool = require("./DbConnect");
async function InsertData(tableName, data) {
  switch (tableName) {
    case "user": {
      try {
        const result = await pool.query(
          "insert into ixf_user values((select coalesce(max(id)+1, 1) from ixf_user),$1,$2,$3)",
          [data.username, data.firstname, data.lastname]
        );
        result.status = "success";

        return result;
      } catch (err) {
        console.error(err.message);
        return { status: "fail" };
      }
    }
    default: {
    }
  }
}

module.exports = InsertData;
