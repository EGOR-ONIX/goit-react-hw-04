import { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "700px",
    height: "500px",
    padding: '0',
    border: 'none',
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function ImageModal({
  currentImages: {
    urls: { regular },
    alt_description,
  },
  onCloseModal,
}) {
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
      <img src={regular} alt={alt_description} />
    </Modal>
  );
}

export default ImageModal;
