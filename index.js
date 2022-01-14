require('dotenv').config();

const express = require('express');
const authController = require('./features/auth/auth.controller');
const productController = require('./features/product/product.controller');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authController);
app.use('/product', productController);

app.get('/health-check', (_, res) =>
  res.json({
    ok: true,
  })
);

app.all('*', (req, res) => {
  if (req.headers.accept === 'application/json') {
    return res.status(404).json({
      error: 'Not found',
    });
  }

  return res.status(404).send(`<!DOCTYPE html>
    <html>
      <body>
          <h1>Page Not Found</h1>
      </body>
      </html>`);
});

const PORT = process.env.PORT || 8999;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
