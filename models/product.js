const mysqlDb = require('../util/database');

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  static findAllProducts() {
    return mysqlDb.execute('SELECT * FROM products');
  }
};

module.exports = Product;
