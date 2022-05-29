const { v4: uuidv4 } = require("uuid");

const Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const { name } = input;

    const newCategory = {
      id: uuidv4(),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { products }) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };

    products.push(newProduct);

    return newProduct;
  },
  addReview: (parent, { input }, { reviews }) => {
    const { date, title, comment, rating, productId } = input;

    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { categories, products }) => {
    const deleteCategoryIndex = categories.findIndex(
      (category) => category.id === id
    );

    if (deleteCategoryIndex !== -1) {
      categories.splice(deleteCategoryIndex, 1);
    }

    products.forEach((product) => {
      if (product.categoryId === id) {
        product.categoryId = null;
      }
    });

    return true;
  },
};

module.exports = Mutation;
