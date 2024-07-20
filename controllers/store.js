const Product = require('../models/product');

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
