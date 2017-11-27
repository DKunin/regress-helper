const express = require('express');

const getProductsQuery = 'SELECT * FROM products';
const removeFromProductsQuery = 'DELETE FROM products WHERE id = ?'

class ProductsHandler {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger || console;
  }

  getRouter() {
    const router = express.Router();
    router.get('/', this.getProducts.bind(this));
    router.post('/remove', this.removeFromProductList.bind(this));
    return router;
  }

  getProducts(req, res) {
    this.logger.debug(
      { reqId: req.id },
      'trying to get products from database'
    );
    this.db
      .query(getProductsQuery)
      .then(products => {
        this.logger.info('successfully fetched prodcuts');
        res.json(products);
      })
      .catch(err => {
        this.logger.error(err);
        res.sendStatus(500);
      });
  }

  removeFromProductList(req, res) {
    console.log(req.body);
    this.db
      .query(removeFromProductsQuery, req.body.id)
      .then(() => {
        this.logger.info('item deleted from product list');
        res.sendStatus(204);
      })
      .catch(err => {
        this.logger.info(err);
        res.sendStatus(500);
      });
  }
}

module.exports = ProductsHandler;
