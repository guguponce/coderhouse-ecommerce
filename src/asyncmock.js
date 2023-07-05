import books from "./assets/filterdBooks.json";

export const getBooks = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(books);
    }, 2000);
  });
};

export const getBooksByCategory = (category) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(books.filter((book) => book.categories.includes(category)));
    }, 2000);
  });
};

export const getItem = (bookID) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(
        books.find((book) => {
          if (book.id === parseInt(bookID)) {
            return true;
          }
        })
      );
    }, 2000);
  });
};
