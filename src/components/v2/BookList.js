import { FiThumbsUp, FiStar, FiX } from "react-icons/fi";

const BookList = ({ books, onRead, onFavorite, favorites, localise, remove }) => (
  <section>
    <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
      <FiThumbsUp className="mr-2" /> {localise("recommendations")}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white p-4 rounded-lg shadow-md relative hover:shadow-lg"
        >
          <h3
            className="font-serif text-lg text-[#2c1810] cursor-pointer"
            onClick={() => onRead(book)}
          >
            {book.title}
          </h3>
          
          <FiStar
            className={`absolute bottom-5 right-10 cursor-pointer ${
              favorites.some((fav) => fav.id === book.id)
                ? "text-yellow-500 fill-current"
                : "text-gray-500"
            }`}
            onClick={() => onFavorite(book)}
          />
          <FiX
            className={`absolute bottom-5 right-4 text-red-500 cursor-pointer ${
              favorites.some((fav) => fav.id === book.id) ? "" : "hidden"
            }`}
            onClick={() => remove(book.id)}
          />
        </div>
      ))}
    </div>
  </section>
);

export default BookList;
