const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-edit-product.html', {
    pageTitle: 'Admin Add Product',
    path: '/admin/add-product',
    btnLabel: 'Add Product',
    pathParam: 'add-product',
    product: {},
    isEdit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const {
    description,
    imageUrl,
    price,
    title,
  } = req.body;

  const product = new Product(null, title, imageUrl, price, description);

  product.addProduct()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error));
};
