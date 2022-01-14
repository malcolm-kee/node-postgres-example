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

  function logout() {
    return fetch('/auth/logout', {
      method: 'POST',
    }).then((res) => {
      if (res.ok) {
        return {};
      }
      throw new Error('Fail');
    });
  }

  return {
    login,
    register,
    logout,
  };
}

function createProductService() {
  /**
   *
   * @param {RequestInit} [requestInit]
   * @returns
   */
  function getProducts(requestInit) {
    return fetch('/product', requestInit).then((res) => res.json());
  }

  function getOneProduct(id) {
    return fetch(`/product/${id}`).then((res) => res.json());
  }

  return {
    getProducts,
    getOneProduct,
  };
}

function createMovieService() {
  /**
   *
   * @param {RequestInit} [requestInit]
   * @returns
   */
  function getMovies(requestInit) {
    return fetch('/movie', requestInit).then((res) => res.json());
  }

  function getOneMovie(id) {
    return fetch(`/movie/${id}`).then((res) => res.json());
  }

  return {
    getMovies,
    getOneMovie,
  };
}

(function main({
  $loginForm,
  $registerForm,
  $logoutBtn,
  $getProductsBtn,
  $getProductsWithCustomHeaderForm,
  $getOneProductForm,
  $healthCheckBtn,
  $getMoviesBtn,
  $getOneMovieForm,
  $output,
  authService,
  productService,
  movieService,
}) {
  function showResult(object) {
    $output.innerHTML = JSON.stringify(object, null, 2);
  }

  $getProductsBtn.addEventListener('click', () => {
    productService.getProducts().then(showResult);
  });

  $logoutBtn.addEventListener('click', () =>
    authService
      .logout()
      .then(() => ($output.innerHTML = 'Success'))
      .catch(() => ($output.innerHTML = 'Fail'))
  );

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

  $getProductsWithCustomHeaderForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const Authorization =
      $getProductsWithCustomHeaderForm.authorizationHeader.value;

    productService
      .getProducts(
        Authorization
          ? {
              headers: {
                Authorization,
              },
            }
          : undefined
      )
      .then(showResult);
  });

  $healthCheckBtn.addEventListener('click', () => {
    fetch('/health-check')
      .then((res) => res.json())
      .then(showResult);
  });

  $getMoviesBtn.addEventListener('click', () => {
    movieService.getMovies().then(showResult);
  });

  $getOneMovieForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const id = $getOneMovieForm.movieId.value;

    movieService.getOneMovie(id).then(showResult);
  });
})({
  authService: createAuthService(),
  productService: createProductService(),
  movieService: createMovieService(),
  $loginForm: document.querySelector('#login-form'),
  $logoutBtn: document.querySelector('#logout-btn'),
  $output: document.querySelector('#output'),
  $registerForm: document.querySelector('#register-form'),
  $getProductsBtn: document.querySelector('#get-products-btn'),
  $getOneProductForm: document.querySelector('#get-product-form'),
  $getProductsWithCustomHeaderForm: document.querySelector(
    '#get-products-with-custom-header-form'
  ),
  $healthCheckBtn: document.querySelector('#health-check-btn'),
  $getMoviesBtn: document.querySelector('#get-movies-btn'),
  $getOneMovieForm: document.querySelector('#get-movie-form'),
});
