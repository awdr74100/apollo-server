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
};

module.exports = Mutation;
