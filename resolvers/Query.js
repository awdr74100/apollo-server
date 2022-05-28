const Query = {
  hello: (parent, args, context) => "World",
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;

    if (filter) {
      const { onSale, avgRating } = filter;

      if (onSale !== undefined) {
        filteredProducts = filteredProducts.filter(
          (product) => product.onSale === onSale
        );
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          const [sumRating, numberOfReviews] = reviews.reduce(
            (accumulator, review) => {
              if (review.productId === product.id) {
                return [accumulator[0] + review.rating, accumulator[1] + 1];
              }

              return accumulator;
            },
            [0, 0]
          );

          return sumRating / numberOfReviews >= avgRating;
        });
      }
    }

    return filteredProducts;
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
