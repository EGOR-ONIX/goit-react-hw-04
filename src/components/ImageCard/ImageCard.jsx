import css from "./ImageCard.module.css";
import ImageModal from "../ImageModal/ImageModal";

function ImageCard({ id, url, alt, openModal }) {
  const handleClick = () => {
    openModal(id);
  };

  return (
    <div className={css.thumb} onClick={handleClick}>
      <img src={url} alt={alt} />
    </div>
  );
}

export default ImageCard;
