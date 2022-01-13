require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authController = require('./features/auth/auth.controller');
const productController = require('./features/product/product.controller');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenGeneratedByUs = jwt.sign(
  {
    userName: 'malcolm-kee',
    permissions: ['get-product'],
  },
  secret
);

const tokenGeneratedByOthers = jwt.sign(
  {
    userName: 'malcolm-kee',
    permissions: ['get-product', 'create-product'],
  },
  'theirSecretKey'
);

try {
  const verifyResult = jwt.verify(tokenGeneratedByUs, secret);

  console.log({ verifyResult });
} catch (err) {
  console.error('Fail');
  console.log(err);
}

try {
  const verifyResult2 = jwt.verify(tokenGeneratedByOthers, secret);
  console.log({ verifyResult2 });
} catch (err) {
  console.error('second fail');
  console.log(err);
}

const decodeResult1 = jwt.decode(tokenGeneratedByUs);
const decodeResult2 = jwt.decode(tokenGeneratedByOthers);

console.log({
  decodeResult1,
  decodeResult2,
});

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(cookieParser());

app.use('/auth', authController);
app.use('/product', productController);

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
