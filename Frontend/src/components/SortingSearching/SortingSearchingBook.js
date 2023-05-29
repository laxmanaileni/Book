import './SortingSearchingBook.css'

const SortingSearchingBook = ({ onSort,onSearch }) => {
  const handleChange = (event) => {
    const option = event.target.value;
    onSort(option);
  };
  const handleChangeSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };
  return (
    
    <div className="searchingandsorting" data-testid="sorting-searching-book">
    <div className="sort-book">
      <select onChange={handleChange} data-testid="sort-select">
        <option className="optionClass" value="">Sort by...</option>
        <option className="optionClass" value="title-asc">Sort by Title (A-Z)</option>
        <option className="optionClass" value="title-desc">Sort by Title (Z-A)</option>
        <option className="optionClass" value="author-asc">Sort by Author (A-Z)</option>
        <option className="optionClass" value="author-desc">Sort by Author (Z-A)</option>
        <option className="optionClass" value="publicationYear-ascInt">
          Sort by Publication Year (Ascending)
        </option>
        <option className="optionClass" value="publicationYear-descInt">
          Sort by Publication Year (Descending)
        </option>
      </select>
      </div>
      <div className='search-book' >
    <input type="text" data-testid="search-input" placeholder="Search by Title / Author / Publication Year" onChange={handleChangeSearch} />
    </div>

    </div>
  );
};

export default SortingSearchingBook;
