import { useEffect, useState } from "react";

export const useBooks = () => {
  const [randomBooks, setRandomBooks] = useState([]); 

  const fetchBooks = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.book)
      .catch(console.error);
  };

  useEffect(() => {
    const bookUrls = [
      "/json/aartis.json",
      "/json/chalisa.json",
      "/json/bhajans.json",
      "/json/mantras.json",
      "/json/others.json",
      "/json/stotras.json",
    ];

    Promise.all(bookUrls.map(fetchBooks))
      .then((results) => {
        const allBooks = results.flat();
        const randomBooks = [];
        while (randomBooks.length < 5) {
          const randomIndex = Math.floor(Math.random() * allBooks.length);
          if (!randomBooks.includes(allBooks[randomIndex])) {
            randomBooks.push(allBooks[randomIndex]);
          }
        }

        setRandomBooks(randomBooks);
      })
      .catch(console.error);
  }, []);

  return randomBooks;
};
