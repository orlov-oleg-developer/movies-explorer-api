const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./config/server-config');
const errorHandler = require('./middlewares/error-handler');

const rootRoutes = require('./routes/index');

const limiter = require('./middlewares/rate-limiter');

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api', rootRoutes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err === null) {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } else {
    console.error(err);
  }
});
