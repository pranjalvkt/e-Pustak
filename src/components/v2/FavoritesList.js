import { FiStar, FiX } from "react-icons/fi";

const FavoritesList = ({ favorites, onRead, onRemove, localise }) => (
  <section className="mb-8">
    <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
      <FiStar className="mr-2" /> {localise("favourite")}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((book) => (
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
          <FiX
            className="absolute bottom-5 right-4 text-red-600 cursor-pointer"
            onClick={() => onRemove(book.id)}
          />
        </div>
      ))}
    </div>
  </section>
);

export default FavoritesList;
