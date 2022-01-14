require('dotenv').config();

const createApp = require('./app');

const app = createApp();

const PORT = process.env.PORT || 8999;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
