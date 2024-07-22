const mysqlDb = require('../util/database');

class Cart {
  constructor(id, quantity) {
    this.id = id;
    this.quantity = quantity;
  }

  static fetchAll() {
    return mysqlDb.execute(
      'SELECT cart.quantity, products.title, products.id FROM cart INNER JOIN products ON cart.productId = products.id'
    );
  }

  static findProductInCart(prodId) {
    return mysqlDb.execute(
      'SELECT * FROM cart WHERE productId = ?',
      [prodId]
    );
  }

  static updateItemInCart(item) {
    return mysqlDb.execute(
      'UPDATE cart SET quantity = ? WHERE productId = ?',
      [item.quantity, item.productId]
    )
  }

  static addItemInCart(item) {
    return mysqlDb.execute(
      'INSERT INTO cart (quantity, productId) VALUES (? , ?)',
      [item.quantity, item.productId]
    )
  }

  static deleteItemInCart(prodId) {
    return mysqlDb.execute(
      'DELETE FROM cart WHERE productId = ?',
      [prodId],
    );
  }
}

module.exports = Cart;
