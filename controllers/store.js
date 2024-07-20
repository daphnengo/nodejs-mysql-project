const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAllProducts()
    .then(([rows, fieldData]) => {
      res.render('store/products.html', {
        products: rows,
        pageTitle: 'Products',
        path: '/products',
      });
    })
    .catch(error => console.log(error));
};
