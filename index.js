const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//User Routers
const { authRouter, postRouter } = require('./routes/index');

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.listen(8000, (err) => {
  if (err) return console.log(err);
  console.log('Server running on port 8000');
});
