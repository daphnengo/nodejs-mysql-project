const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAllProducts()
    .then(([allProducts]) => {
      res.render('store/products.html', {
        products: allProducts,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch(error => console.log(error));
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProductById(productId)
    .then(([product]) => {
      res.render('store/product-details.html', {
        product: product[0],
        pageTitle: product[0].title,
        path: '/product-details',
      })
    })
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;

  Cart.findProductInCart(productId)
    .then(([product]) => {
      const prod = product?.length && product[0];

      if (Object.values(prod)?.length) {
        // if the product already exists in cart, increase its quantity
        prod.quantity += 1;

        return Cart.updateProductInCart(prod);
      } else {
        let newProduct;
        newProduct.quantity = 1;
        newProduct.productId = productId;

        // if the product does not exists in cart, add it into the cart
        return Cart.addProductInCart(newProduct);
      }
    })
    .then(() => res.redirect('/cart'))
    .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
  Cart.fetchAll()
    .then(([products]) => {
      res.render('store/cart.html', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(error => console.log(error));
};
