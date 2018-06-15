const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const models = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));
app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  await models.db.sync({ force: true });
  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

init();
