const mysql = require('mysql2');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'sch17nodeApp',
  password: '7EA5752FE7D3A5986C2BEC7043963CF2FB7702B1',
  database: 'school17'
});

con.connect();

con.execute("insert into test values (null, 'mocktest3');", (err, res) => {
  if (err) console.log(err);
  console.log(res);
});
