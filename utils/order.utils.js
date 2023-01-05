module.exports = {
  createInvoice: (username, table) => {
    return (
      "RO" + Math.floor(Math.random() * 10000) + table + username.slice(0, 1)
    );
  },
  sumTotalBeforeTax: (productCarts) => {
    let total = 0;
    for (let i = 0; i < productCarts.length; i++) {
      const product = productCarts[i];
      total += product.productId.price * product.qty;
    }
    return total;
  },
};
