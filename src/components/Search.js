import { useState } from "react";
import { UseGlobalContext } from "../context";

const Search = () => {
  const [text, setText] = useState("");

  const { setSearchTerm, fetchRandomMeal } = UseGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    text && setSearchTerm(text);
  };

  const handleRandomMeal = () => {
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  };

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="search meal"
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Search
        </button>
        <button
          type="button"
          className="btn btn-hipster"
          onClick={handleRandomMeal}
        >
          Random Meal
        </button>
      </form>
    </header>
  );
};
export default Search;
