const express = require('express');
const app = express();
const port = 8734;
const cors = require('cors');
const db = require('./mockdb.json')
app.use(cors({origin: '*', optionsSuccessStatus: 200}));
app.get('/', (req, res) => {
  if(!req.params.q) {
    return res.json({
      _success: false
    });
  }
  res.json({
    _success: true,
    data: db.reduce((acc, val) => [...acc, Object.keys(val).map(prefix => val[prefix].item[0].name)], [])[0].sort()
  });
});
app.listen(port, () => console.log(`API listening on port ${port}!`))
