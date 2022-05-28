const Category = {
  products: ({ id: categoryId }, { filter }, { products }) => {
    if (filter?.onSale !== undefined) {
      return products
        .filter((product) => product.categoryId === categoryId)
        .filter((product) => product.onSale === filter.onSale);
    }
    return products.filter((product) => product.categoryId === categoryId);
  },
};

module.exports = Category;
