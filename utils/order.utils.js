module.exports = {
  createInvoice: (username, table) => {
    return (
      "RO" + Math.floor(Math.random() * 10000) + table + username.slice(0, 2)
    );
  },
  sumTotalBeforeTax: (productCarts) => {
    productCarts.reduce(function (item, data) {
      return item + data.productId.price * data.qty;
    }, 0);
  },
};
