import css from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";

function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const { inputSearch } = form.elements;

    if (inputSearch.value === "")
      toast.error("You must enter a keyword to start searching for images!", {
        duration: 4000,
        position: "top-right",
      });

    onSubmit(inputSearch.value);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="inputSearch"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          <GoSearch />
        </button>
        <Toaster />
      </form>
    </header>
  );
}

export default SearchBar;
