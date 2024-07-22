const mysqlDb = require('../util/database');

class Cart {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }

  static fetchAll() {
    return mysqlDb.execute(
      'SELECT cart.quantity, products.title FROM cart INNER JOIN products ON cart.productId = products.id'
    );
  }

  static findProductInCart(prodId) {
    return mysqlDb.execute(
      'SELECT * FROM cart WHERE productId = ?',
      [prodId]
    );
  }

  static updateProductInCart(product) {
    return mysqlDb.execute(
      'UPDATE cart SET quantity = ? WHERE productId = ?',
      [product.quantity, product.productId]
    )
  }

  static addProductInCart(product) {
    return mysqlDb.execute(
      'INSERT INTO cart (quantity, productId) VALUES (? , ?)',
      [product.quantity, product.productId]
    )
  }
}

module.exports = Cart;
