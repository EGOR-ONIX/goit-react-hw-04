import css from "./ImageModal.module.css";
import { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    height: "500px",
    padding: "0",
    border: "none",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function ImageModal({ currentImages, onCloseModal }) {
  console.log(currentImages);
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    console.log(target, currentTarget);
    if (currentTarget === target) {
      onCloseModal();
    }
  };

  return (
    <Modal
      isOpen={true}
      style={customStyles}
      onRequestClose={handleBackdropClick}
    >
      <img
        src={currentImages.urls.regular}
        alt={currentImages.alt_description}
      />
      <span className={css.likes}>Likes: {currentImages.likes}</span>
    </Modal>
  );
}

export default ImageModal;
