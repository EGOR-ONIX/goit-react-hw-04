import css from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard";

function ImageGallery({ gallery, openModal}) {
  return (
    <ul className={css["gallery-list"]}>
      {gallery.map(({ id, alt_description, urls: { small } }) => (
        <li className={css["gallery-item"]} key={id}>
          <ImageCard
            id={id}
            url={small}
            alt={alt_description}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
