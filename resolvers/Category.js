const Category = {
  products: ({ id: categoryId }, { filter }, { products, reviews }) => {
    let filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

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
};

module.exports = Category;
