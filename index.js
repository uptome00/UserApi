const express = require("express");
const pool = require("./DbConnect");
const InsertData = require("./InsertData");
let app = express();

app.use(express.json()); // request body type json

//getAllUser
app.get("/user", async (req, res) => {
  try {
    const result = await pool.query("select * from ixf_user");
    result.status = "success";
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.json({ status: "fail" });
  }
});

//insert data
app.post("/user", async (req, res) => {
  try {
    const { data } = req.body;
    const result = await InsertData("user", data);
    result.status = "success";
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.json({ status: "fail" });
  }
});

//update by username
app.put("/user", async (req, res) => {
  try {
    const { data } = req.body;
    const user = data.user;
    const set = () => {
      let value = "";
      for (var key in user) {
        value += key + " = '" + user[key] + "',";
      }
      value = value.substring(0, value.length - 1);
      return value;
    };
    const result = await pool.query(
      `update ixf_user set ${set()} where username = $1 `,
      [data.conditions.username]
    );
    res.json({ status: "success" });
  } catch (err) {
    console.log(err.message);
    res.json({ status: "fail" });
  }
});

//delete data
app.delete("/user", async (req, res) => {
  try {
    const { data } = req.body;

    const selectKey = () => {
      for (let key in data.conditions) {
        if (data.conditions[key] != null || data.conditions[key] != "") {
          return key;
        }
      }
    };
    const result = await pool.query(
      `delete from ixf_user where ${selectKey()} = $1 `,
      [Object.values(data.conditions).find(selectKey)]
    );
    result.status = "success";
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.json({ status: "fail" });
  }
});

app.listen(8080, () => {
  console.log("User Api project is running on port 8080.");
});
