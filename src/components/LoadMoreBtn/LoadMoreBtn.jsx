import css from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <button className={css.btn} type="button" onClick={handleClick}>
      Load more
    </button>
  );
}

export default LoadMoreBtn;
