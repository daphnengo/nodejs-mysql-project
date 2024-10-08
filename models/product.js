const mysqlDb = require('../util/database');

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  addProduct() {
    return mysqlDb.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  updateProduct() {
    return mysqlDb.execute(
      'UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?',
      [this.title, this.price, this.description, this.imageUrl, this.id]
    )
  }

  static findAllProducts() {
    return mysqlDb.execute('SELECT * FROM products');
  }

  static findProductById(prodId) {
    return mysqlDb.execute(
      'SELECT * FROM products WHERE id = ?',
      [prodId]
    );
  }

  static deleteProductById(prodId) {
    return mysqlDb.execute(
      'DELETE FROM products WHERE id = ?',
      [prodId]
    );
  }
};

module.exports = Product;
