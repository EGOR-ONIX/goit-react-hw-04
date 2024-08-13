import { useState, useEffect } from "react";

import GalleryApiService from "./components/Service/gallery-api.js";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

import toast from "react-hot-toast";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchGalleryItems(query, page) {
      try {
        setLoading(true);

        const Gallery = new GalleryApiService();
        Gallery.query = query;
        Gallery.page = page;

        const newData = await Gallery.fetchImages();

        setGalleryItems((prevGalleryItems) => [
          ...prevGalleryItems,
          ...newData.results,
        ]);
        setTotalImages(newData.total);

        if (!newData.total) {
          setError(true);
          return;
        }

        if (page === 1)
          toast.success(`Hooray! We found ${newData.total} images.`, {
            duration: 4000,
            position: "top-right",
          });
      } catch (error) {
        setError(true);
        setGalleryItems([]);
        setTotalImages(0);
        setGalleryPage(1);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryItems(searchQuery, galleryPage);
  }, [searchQuery, galleryPage]);

  const handleSubmit = (userSearchQuery) => {
    if (searchQuery === userSearchQuery) return;

    setSearchQuery("");
    setGalleryItems([]);
    setTotalImages(0);
    setGalleryPage(1);
    setError(false);

    setSearchQuery(userSearchQuery);
  };

  const onLoadMore = () => {
    setGalleryPage((prevGalleryPage) => prevGalleryPage + 1);
  };

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const openModalImages = (idImages) => {
    toggleModal();
    setCurrentImages(() => galleryItems.find((img) => img.id === idImages));
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {galleryItems.length > 0 && (
        <ImageGallery gallery={galleryItems} openModal={openModalImages} />
      )}
      {galleryItems.length < totalImages && !loading && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {isModalOpen && (
        <ImageModal currentImages={currentImages} onCloseModal={toggleModal} />
      )}
    </>
  );
}

export default App;
