import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = ({ book, handleRemoveBook }) => {
  const navigate = useNavigate();
  const { id, publicationYear, author, title } = book;

  return (
    <div className="book">
      <p className="book-title">{title}</p>
      <div className="bookDetail">
        <p>Author: {author}</p>
        <p>Publication Year: {publicationYear}</p>
      </div>
      <div className="buttons">
        <button className="edit" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button  className="delete" onClick={() => handleRemoveBook(id)}>Delete</button>
      </div>
    </div>
  )
}

export default Book