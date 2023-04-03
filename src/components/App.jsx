import React, { useState, useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from './Button/Button';
import {Loader} from './Loader/Loader'
import {Modal} from "./Modal/Modal";
import { getPictures } from './API/Api'
import './App.css'

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPictureURL, setModalPictureURL] = useState('');
  const [modalPictureALT, setModalPictureALT] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await getPictures(search, page);
        const searchResults = await response.json();
        const hits = searchResults.hits;
        setShowLoadMore(hits.length % 12 === 0 && hits.length !== 0);
        setSearchResults((prevResults) => [...prevResults, ...hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };

    if (search !== '' && page > 0) {
      fetchData();
    }
  }, [search, page]);

  const handleSearch = (data) => {
    setSearch(data.trim().toLowerCase());
    setPage(1);
    setSearchResults([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = ({ largeImageURL, tags }) => {
    setModalPictureURL(largeImageURL);
    setModalPictureALT(tags);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='App'>
      <Searchbar onSubmit={handleSearch} />
      {error && <div className="error">{error.message}</div>}
      <div className='Container'>
        <ImageGallery searchResults={searchResults} openModal={handleOpenModal}/>
        {showLoadMore && <Button onClick={handleLoadMore} />}
      </div>
      {loader && (<Loader />)}
      {showModal && (<Modal closeModal={handleCloseModal} picture={modalPictureURL} alt={modalPictureALT} />)}
    </div>
  );
}
