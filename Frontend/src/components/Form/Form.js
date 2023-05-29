import { useState } from "react";
import "./Form.css";
const Form = ({ book, handleSubmit }) => {
  const [bookState, setBookState] = useState({
    title: book ? book.title : "",
    author: book ? book.author : "",
    publicationYear: book ? book.publicationYear : "",
  });

  const handleChange = (e) => {
    setBookState({
      ...bookState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      ...bookState,
    });
    setBookState({ title: "", author: "", publicationYear: "" });
  };

  const renderInputField = (label, placeholder, name) => (
    <div className="inputField">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={bookState[name]}
        onChange={handleChange}
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );

  const renderInputFieldNumber = (label, placeholder, name) => (
    <div className="inputField">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={bookState[name]}
        onChange={handleChange}
        name={name}
        type="number"
        placeholder={placeholder}
      />
    </div>
  );

  const disabledSubmit =
    !bookState.title || !bookState.author || !bookState.publicationYear;

  return (
    <form onSubmit={onSubmit} className="form">
      {renderInputField("Book Title", "Enter title of Book", "title")}
      {renderInputField("Book Author", "Enter name of Author", "author")}
      {renderInputFieldNumber(
        "Book Publication Year",
        "Enter year of Publication",
        "publicationYear"
      )}
      <button type="submit" className="btnForm" disabled={disabledSubmit}>
        {book ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default Form;
