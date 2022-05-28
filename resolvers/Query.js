const Query = {
  hello: (parent, args, context) => "World",
  products: (parent, { filter }, { products }) => {
    if (filter?.onSale !== undefined) {
      return products.filter((product) => product.onSale === filter.onSale);
    }
    return products;
  },
  product: (parent, { id }, { products }) => {
    return products.find((product) => product.id === id);
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) => {
    return categories.find((category) => category.id === id);
  },
};

module.exports = Query;
