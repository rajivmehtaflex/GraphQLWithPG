const { Client } = require("pg");
const client = new Client({
  user: "sedd",
  host: "localhost",
  database: "sedd",
  password: "sedd",
  port: 5432
});

const getConnection = () => {
  return new Promise((res, rej) => {
    client.connect();
    res(client);
  });
};

const getPGData = db => {
  return new Promise((res, rej) => {
    db.query("select *  from shift", (err, result) => {
      res(result.rows[0].shiftdetailjson);
    });
  });
};

module.exports.db = {
  getConnection,
  getPGData
};
