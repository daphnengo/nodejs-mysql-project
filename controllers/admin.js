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
    .then(() => res.redirect('/admin/manage-products'))
    .catch(error => console.log(error));
};

exports.getManageProducts = (req, res, next) => {
  Product.findAllProducts()
    .then(([allProducts]) => {
      res.render('admin/manage-products.html', {
        products: allProducts,
        pageTitle: 'Admin Manage Products',
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProductById(productId)
    .then(([product]) => {
      console.log(product);
      res.render('admin/add-edit-product.html', {
        pageTitle: 'Admin Edit Product',
        path: '/admin/edit-product',
        btnLabel: 'Update Product',
        pathParam: 'edit-product',
        product: product[0],
        isEdit: true,
      });
    })
    .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const {
    description,
    imageUrl,
    price,
    title,
    productId,
  } = req.body;

  const product = new Product(productId, title, imageUrl, price, description);

  product.updateProduct()
    .then(() => res.redirect('/admin/manage-products'))
    .catch(error => console.log(error));
};
