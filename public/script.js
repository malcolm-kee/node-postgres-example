function createAuthService() {
  function login(username, password) {
    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
  }

  function register(username, password, email) {
    return fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    }).then((res) => res.json());
  }

  return {
    login,
    register,
  };
}

function createProductService() {
  function getProducts() {
    return fetch('/product').then((res) => res.json());
  }

  function getOneProduct(id) {
    return fetch(`/product/${id}`).then((res) => res.json());
  }

  return {
    getProducts,
    getOneProduct,
  };
}

(function main({
  $loginForm,
  $registerForm,
  $getProductsBtn,
  $getOneProductForm,
  $output,
  authService,
  productService,
}) {
  function showResult(object) {
    $output.innerHTML = JSON.stringify(object, null, 2);
  }

  $getProductsBtn.addEventListener('click', () => {
    productService.getProducts().then(showResult);
  });

  $getOneProductForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const id = $getOneProductForm.productId.value;

    productService.getOneProduct(id).then(showResult);
  });

  $loginForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const username = $loginForm.username.value;
    const password = $loginForm.password.value;
    authService.login(username, password).then(showResult);
  });

  $registerForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const username = $registerForm.newUsername.value;
    const password = $registerForm.newPassword.value;
    const email = $registerForm.email.value;
    authService.register(username, password, email).then(showResult);
  });
})({
  authService: createAuthService(),
  productService: createProductService(),
  $loginForm: document.querySelector('#login-form'),
  $output: document.querySelector('#output'),
  $registerForm: document.querySelector('#register-form'),
  $getProductsBtn: document.querySelector('#get-products-btn'),
  $getOneProductForm: document.querySelector('#get-product-form'),
});
